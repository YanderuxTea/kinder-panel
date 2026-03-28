import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto.js';
import { PrismaService } from '../prisma.service.js';
import bcrypt from 'bcrypt';
import { FirstStepDto } from './dto/first-step-reset.dto.js';
import { SecondStepDto } from './dto/second-step-reset.dto.js';
import { ThirdStepDto } from './dto/third-step-reset.dto.js';
import { RedisService } from '../redis.service.js';
import { AuthenticateUser } from './dto/authenticate-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { VerifyToken } from './dto/verify-token.dto.js';
import { JwtPayload } from 'src/jwt-payload-interface.js';
@Injectable()
export class AuthService {
  constructor(
    private redis: RedisService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async logoutUser(dto: VerifyToken) {
    const { token } = dto;
    try {
      const data: JwtPayload = await this.jwtService.verifyAsync(token);
      const sessionId = data.sessionId;
      await this.redis.del(`session-${sessionId}`);
      await this.prisma.devices.delete({ where: { sessionId: sessionId } });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
  async verifyToken(dto: VerifyToken) {
    const { token } = dto;
    try {
      const data: JwtPayload = await this.jwtService.verifyAsync(token);
      const cache = await this.redis.hgetall(`session-${data.sessionId}`);
      if (!cache || !cache.token || !cache.sessionId) {
        const tokenInDb = await this.prisma.devices.findUnique({
          where: { sessionId: data.sessionId },
          select: { token: true, sessionId: true },
        });
        if (tokenInDb) {
          const check = await bcrypt.compare(token, tokenInDb.token);
          if (check) {
            await this.redis.hset(`session-${tokenInDb.sessionId}`, {
              sessionId: String(tokenInDb.sessionId),
              token: String(tokenInDb.token),
            });
            await this.redis.expire(`session-${tokenInDb.sessionId}`, 604800);
            return { ok: true, data: data };
          } else {
            return { ok: false };
          }
        } else {
          return { ok: false };
        }
      } else {
        const check = await bcrypt.compare(token, cache.token);
        if (check) {
          return { ok: true, data: data };
        } else {
          return { ok: false };
        }
      }
    } catch {
      return { ok: false };
    }
  }
  async register(dto: CreateUserDto) {
    try {
      const { login, password, email, fullName } = dto;
      const hash = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          password: hash,
          email: email,
          login: login,
          fullname: fullName,
        },
      });
      return JSON.stringify({ ok: true });
    } catch {
      return JSON.stringify({ ok: false });
    }
  }
  async authenticateUser(dto: AuthenticateUser, ip: string) {
    const { login, password } = dto;
    const res = await this.redis.get(`attempt-user-login-${ip}`);
    if (!res) {
      await this.redis.set(`attempt-user-login-${ip}`, '1', 'EX', 300);
    } else {
      if (Number(res) >= 5) {
        return { ok: false, status: 429 };
      }
      await this.redis.incr(`attempt-user-login-${ip}`);
    }
    const user = await this.prisma.user.findUnique({
      where: { login: login },
      select: {
        password: true,
        login: true,
        role: true,
        id: true,
        group: { select: { id: true } },
        fullname: true,
      },
    });
    if (!user) {
      return { ok: false };
    } else {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        const sessionId = randomUUID();
        const payload: JwtPayload = {
          id: user.id,
          fullName: user.fullname,
          sessionId: sessionId,
          login: user.login,
          role: user.role,
          groupId: user.group?.id || 'not',
          date: Date.now(),
        };
        const token = this.jwtService.sign(payload);
        const hashToken = await bcrypt.hash(token, 10);
        await this.prisma.devices.create({
          data: {
            sessionId: sessionId,
            token: hashToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            userId: user.id,
          },
        });
        await this.redis.hset(`session-${sessionId}`, {
          sessionId: sessionId,
          token: hashToken,
        });
        await this.redis.expire(`session-${sessionId}`, 604800);
        return { ok: true, token: token };
      } else {
        return { ok: false };
      }
    }
  }
  async firstStep(dto: FirstStepDto, ip: string) {
    const { login } = dto;

    const res = await this.redis.get(`reset-password-action-${ip}`);
    if (!res) {
      await this.redis.set(`reset-password-action-${ip}`, '1', 'EX', 3600);
    } else {
      if (Number(res) >= 10) {
        return { ok: false, status: 429 };
      }
      await this.redis.incr(`reset-password-action-${ip}`);
    }
    const result = await this.prisma.user.findUnique({
      where: { login: login },
      select: { email: true },
    });
    if (result) {
      const code = Math.floor(100000 + Math.random() * 900000);
      const hashCode = await bcrypt.hash(code.toString(), 10);
      await this.prisma.user.update({
        where: { login: login },
        data: {
          recoveryCode: hashCode,
          recoveryCodeExpires: new Date(Date.now() + 1000 * 60 * 5),
        },
      });
      return { ok: true, email: result.email, code: code };
    } else {
      return { ok: false };
    }
  }
  async secondStep(dto: SecondStepDto, ip: string) {
    const { login, code } = dto;
    const res = await this.redis.get(`reset-password-action-${ip}`);
    if (!res) {
      await this.redis.set(`reset-password-action-${ip}`, '1', 'EX', 3600);
    } else {
      if (Number(res) >= 10) {
        return { ok: false, status: 429 };
      }
      await this.redis.incr(`reset-password-action-${ip}`);
    }
    const user = await this.prisma.user.findUnique({
      where: { login: login },
      select: { recoveryCode: true },
    });
    if (user && user.recoveryCode) {
      const result = await bcrypt.compare(code, user.recoveryCode);
      if (result) {
        return { ok: true };
      } else {
        return { ok: false };
      }
    } else {
      return { ok: false, status: 500 };
    }
  }
  async thirdStep(dto: ThirdStepDto, ip: string) {
    const { login, code, password } = dto;
    const res = await this.redis.get(`reset-password-action-${ip}`);
    if (!res) {
      await this.redis.set(`reset-password-action-${ip}`, '1', 'EX', 3600);
    } else {
      if (Number(res) >= 10) {
        return { ok: false, status: 429 };
      }
      await this.redis.incr(`reset-password-action-${ip}`);
    }
    const user = await this.prisma.user.findUnique({
      where: { login: login },
      select: { recoveryCode: true },
    });
    if (user && user.recoveryCode) {
      const check = await bcrypt.compare(code, user.recoveryCode);
      if (check) {
        const newPassHash = await bcrypt.hash(password, 10);
        await this.prisma.user.update({
          where: { login: login },
          data: {
            password: newPassHash,
            recoveryCode: null,
            recoveryCodeExpires: null,
          },
        });
        return { ok: true };
      } else {
        return { ok: false };
      }
    } else {
      return { ok: false, status: 500 };
    }
  }
}

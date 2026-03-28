import { Injectable } from '@nestjs/common';
import { GetData } from './dto/get-data.dto.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload-interface.js';
import { PrismaService } from '../prisma.service.js';
import { RedisService } from '../redis.service.js';
import { ChangeDataSettings } from './dto/change-data.dto.js';
import { ChangePassword } from './dto/change-password.dto.js';
import bcrypt from 'bcrypt';
@Injectable()
export class SettingsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
  async getData(dto: GetData) {
    const decodeToken: JwtPayload = this.jwtService.decode(dto.token);
    const redisKey = `settings-data-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const data = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { email: true, tel: true, address: true },
      });
      await this.redis.set(redisKey, JSON.stringify(data), 'EX', 3600);
      return { data: data };
    }
  }
  async changeData(dto: ChangeDataSettings) {
    const decodeToken: JwtPayload = this.jwtService.decode(dto.token);
    const redisKey = `settings-data-${decodeToken.id}`;
    try {
      const res = await this.prisma.user.update({
        where: { id: decodeToken.id },
        data: {
          fullname: dto.fullname,
          tel: dto.tel,
          email: dto.email,
          address: dto.address,
        },
        select: { email: true, tel: true, address: true },
      });
      await this.redis.set(redisKey, JSON.stringify(res), 'EX', 3600);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
  async changePassword(dto: ChangePassword) {
    const decodeToken: JwtPayload = await this.jwtService.decode(dto.token);
    const { currentPassword, newPassword } = dto;
    const oldPass = await this.prisma.user.findUnique({
      where: { id: decodeToken.id },
      select: { password: true },
    });
    if (oldPass) {
      const verify = await bcrypt.compare(currentPassword, oldPass.password);
      if (verify) {
        if (newPassword === currentPassword) {
          return {
            ok: false,
            message: 'Текущий пароль не должен совпадать с новым',
          };
        } else {
          const hashNewPass = await bcrypt.hash(newPassword, 10);
          await this.prisma.user.update({
            where: { id: decodeToken.id },
            data: { password: hashNewPass },
          });
          return { ok: true };
        }
      } else {
        return {
          ok: false,
          message: 'Введенный пароль не совпадает с текущим',
        };
      }
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
}

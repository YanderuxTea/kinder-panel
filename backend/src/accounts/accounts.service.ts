import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RedisService } from '../redis.service.js';
import { GetAccounts } from './dto/get-accounts.dto.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt-payload-interface.js';
import { FetchMoreAccounts } from './dto/fetch-more-accounts.dto.js';
import { CreateAccount } from './dto/create-account.dto.js';
import bcrypt from 'bcrypt';
import { Role } from '../auth/role-decorator.dto.js';
import { DeleteAccount } from './dto/delete-account.dto.js';

@Injectable()
export class AccountsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
  ) {}
  async getAccounts(dto: GetAccounts) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const pageSize = 30;
    const redisKey = `accounts-sa-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    }
    const accounts = await this.prisma.user.findMany({
      where: { creatorId: decodeToken.id },
      select: {
        id: true,
        role: true,
        fullname: true,
        login: true,
        group: { select: { name: true, id: true } },
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = accounts.length > pageSize;
    if (hasMore) {
      accounts.pop();
    }
    const cursor = accounts.at(-1)?.id || '';
    const data = {
      accounts: accounts,
      hasMore: hasMore,
      cursor: cursor,
    };
    await this.redis.set(redisKey, JSON.stringify(data), 'EX', 300);
    return { data: data };
  }
  async fetchMoreAccounts(dto: FetchMoreAccounts) {
    const { token, cursor } = dto;
    const pageSize = 30;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const accounts = await this.prisma.user.findMany({
      where: { creatorId: decodeToken.id, id: { lt: cursor } },
      select: {
        id: true,
        role: true,
        fullname: true,
        login: true,
        group: { select: { name: true, id: true } },
      },
      take: pageSize + 1,
    });
    const hasMore = accounts.length > pageSize;
    if (hasMore) {
      accounts.pop();
    }
    const newCursor = accounts.at(-1)?.id || '';
    const data = {
      accounts: accounts,
      hasMore: hasMore,
      cursor: newCursor,
    };
    return { data: data };
  }
  async createAccount(dto: CreateAccount) {
    const { fullname, password, login, token, email, role } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      const res = await this.prisma.user.create({
        data: {
          fullname: fullname,
          password: hashPassword,
          role: role as Role,
          creatorId: decodeToken.id,
          login: login,
          email: email,
          kindergartenId: dto.id,
        },
        select: {
          id: true,
          role: true,
          fullname: true,
          login: true,
          group: { select: { name: true, id: true } },
        },
      });
      await this.redis.del(`accounts-sa-${decodeToken.id}`);
      await this.redis.del(`kindergartens-sa-${decodeToken.id}`);
      return { ok: true, data: res };
    } catch {
      return { ok: false, message: 'Логин или почта уже используются' };
    }
  }
  async deleteAccount(dto: DeleteAccount) {
    try {
      const decodeToken: JwtPayload = this.jwt.decode(dto.token);
      await this.redis.del(`accounts-sa-${decodeToken.id}`);
      await this.prisma.user.delete({ where: { id: dto.id } });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}

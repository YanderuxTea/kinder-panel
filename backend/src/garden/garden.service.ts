import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RedisService } from '../redis.service.js';
import { VerifyToken } from 'src/auth/dto/verify-token.dto.js';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/jwt-payload-interface.js';
import { CreateKindergarten } from './dto/create-kindergarten.dto.js';

@Injectable()
export class GardenService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async getStatistics() {
    const redisKey = 'kindergarten-statistics';
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const now = new Date(Date.now());
      const [total, freeCount, inactiveCount] = await Promise.all([
        this.prisma.kindergarten.count(),
        this.prisma.kindergarten.count({ where: { isFreeTier: true } }),
        this.prisma.kindergarten.count({
          where: { endSubscription: { lt: now } },
        }),
      ]);
      const data = {
        total: total,
        freeCount: freeCount,
        inactiveCount: inactiveCount,
      };
      await this.redis.set(redisKey, JSON.stringify(data), 'EX', 60);
      return { data: data };
    }
  }
  async getKindergartens(dto: VerifyToken) {
    const data: JwtPayload = this.jwtService.decode(dto.token);
    const userId = data.id;
    const redisKey = `kindergartens-sa-${userId}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const kindergartens = await this.prisma.kindergarten.findMany({
        where: { ownerId: userId },
        select: {
          id: true,
          name: true,
          address: true,
          _count: {
            select: {
              users: { where: { OR: [{ role: 'staff' }, { role: 'user' }] } },
            },
          },
          endSubscription: true,
          isFreeTier: true,
        },
        orderBy: { id: 'desc' },
      });
      await this.redis.set(redisKey, JSON.stringify(kindergartens), 'EX', 60);
      return { data: kindergartens };
    }
  }
  async createKindergarten(dto: CreateKindergarten) {
    const { token, address, name } = dto;
    const data: JwtPayload = this.jwtService.decode(token);
    const redisKey = `kindergartens-sa-${data.id}`;
    try {
      const kindergarten = await this.prisma.kindergarten.create({
        data: {
          address: address,
          name: name,
          ownerId: data.id,
          endSubscription: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        },
        select: {
          id: true,
          name: true,
          address: true,
          _count: {
            select: {
              users: { where: { OR: [{ role: 'staff' }, { role: 'user' }] } },
            },
          },
          endSubscription: true,
          isFreeTier: true,
        },
      });
      const existingCache = await this.redis.get(redisKey);
      if (existingCache) {
        const kindergartens = [kindergarten, ...JSON.parse(existingCache)];
        await this.redis.set(redisKey, JSON.stringify(kindergartens), 'EX', 60);
      }
      return { ok: true, kindergarten: kindergarten };
    } catch {
      return { ok: false };
    }
  }
}

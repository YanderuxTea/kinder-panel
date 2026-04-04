import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RedisService } from '../redis.service.js';
import { JwtService } from '@nestjs/jwt';
import { GetChildren } from './dto/get-children.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';

@Injectable()
export class UserMainService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly jwt: JwtService,
  ) {}
  async getChildren(dto: GetChildren) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `children-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const children = await this.prisma.children.findMany({
        where: { parents: { some: { id: decodeToken.id } } },
        select: {
          id: true,
          dateOfBirth: true,
          name: true,
          surname: true,
          attendances: {
            select: { mark: true, createdAt: true },
            take: 1,
            orderBy: { id: 'desc' },
          },
          group: {
            select: {
              name: true,
            },
          },
        },
      });
      await this.redis.set(redisKey, JSON.stringify(children), 'EX', 360);
      return { data: children };
    }
  }
  async getNutrition(dto: GetChildren) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `nutrition-user-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const kindergartenId = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { kindergartenId: true },
      });
      if (kindergartenId && kindergartenId.kindergartenId) {
        const dayNow = new Date(Date.now()).getDay();
        const nutrition = await this.prisma.nutrition.findFirst({
          where: {
            dayWeek: dayNow,
            kindergartenId: kindergartenId.kindergartenId,
          },
          select: {
            dayWeek: true,
            breakfast: true,
            breakfastTime: true,
            secondBreakfast: true,
            secondBreakfastTime: true,
            lunch: true,
            lunchTime: true,
            afternoonSnack: true,
            afternoonSnackTime: true,
          },
        });
        await this.redis.set(redisKey, JSON.stringify(nutrition), 'EX', 360);
        return { data: nutrition };
      } else {
        return { data: null };
      }
    }
  }
}

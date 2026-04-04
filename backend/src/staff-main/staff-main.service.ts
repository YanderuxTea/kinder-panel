import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis.service.js';
import { GetInformation } from './dto/get-information.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';

@Injectable()
export class StaffMainService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}
  async getInformation(dto: GetInformation) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `information-staff-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    } else {
      const information = await this.prisma.group.findUnique({
        where: { id: decodeToken.groupId },
        select: {
          name: true,
          _count: { select: { childrens: true } },
          childrens: {
            select: {
              dateOfBirth: true,
              name: true,
              surname: true,
              id: true,
              parents: {
                select: {
                  id: true,
                  fullname: true,
                  tel: true,
                  login: true,
                  email: true,
                  address: true,
                },
              },
            },
          },
        },
      });
      await this.redis.set(redisKey, JSON.stringify(information), 'EX', 360);
      return { data: information };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { GetAdvertisements } from './dto/get-advertisements.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';
import { RedisService } from '../redis.service.js';
import { CreateAdvertisement } from './dto/create-advertisement.dto.js';
import { FetchMoreAdvertisement } from './dto/fetch-more-advertisement.dto.js';
import { DeleteAdvertisement } from './dto/delete-advertisement.dto.js';

@Injectable()
export class AdvertisementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}
  async getAdvertisements(dto: GetAdvertisements) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `advertisements-${decodeToken.id}`;
    const pageSize = 30;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    }
    if (decodeToken.role === 'sad_admin') {
      const kindergartenIds = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { kindergartenOwn: { select: { id: true } } },
      });
      if (kindergartenIds) {
        const ids = kindergartenIds.kindergartenOwn.map((k) => k.id);
        const data = await this.prisma.advertisements.findMany({
          where: { kindergartenId: { in: ids } },
          select: {
            id: true,
            author: {
              select: {
                fullname: true,
                group: { select: { name: true } },
              },
            },
            createdAt: true,
            text: true,
          },
          take: pageSize + 1,
          orderBy: { createdAt: 'desc' },
        });
        const hasMore = data.length > pageSize;
        if (hasMore) {
          data.pop();
        }
        const cursor = data.at(-1)?.id || '';
        const fullData = {
          data: data,
          hasMore: hasMore,
          cursor: cursor,
        };
        await this.redis.set(redisKey, JSON.stringify(fullData), 'EX', 360);
        return { data: fullData };
      } else {
        return { ok: false };
      }
    } else {
      const groupId = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { groupId: true },
      });
      if (groupId && groupId.groupId) {
        const data = await this.prisma.advertisements.findMany({
          where: { toGroupId: groupId.groupId },
          select: {
            id: true,
            author: {
              select: {
                fullname: true,
                group: { select: { name: true } },
              },
            },
            createdAt: true,
            text: true,
          },
          take: pageSize + 1,
          orderBy: { id: 'desc' },
        });
        const hasMore = data.length > pageSize;
        if (hasMore) {
          data.pop();
        }
        const cursor = data.at(-1)?.id || '';
        const fullData = {
          data: data,
          hasMore: hasMore,
          cursor: cursor,
        };
        return { data: fullData };
      } else {
        return { ok: false };
      }
    }
  }
  async createAdvertisement(dto: CreateAdvertisement) {
    const { token, text } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `advertisements-${decodeToken.id}`;
    const user = await this.prisma.user.findUnique({
      where: { id: decodeToken.id },
      select: { kindergartenId: true, groupId: true },
    });
    if (!user || !user.groupId || !user.kindergartenId) {
      return { ok: false, message: 'Пользователь не найден' };
    }
    try {
      const data = await this.prisma.advertisements.create({
        data: {
          text: text,
          authorId: decodeToken.id,
          kindergartenId: user.kindergartenId,
          toGroupId: user.groupId,
        },
        select: {
          id: true,
          author: {
            select: {
              fullname: true,
              group: { select: { name: true } },
            },
          },
          createdAt: true,
          text: true,
        },
      });
      const idsUsers = await this.prisma.user.findMany({
        where: { groupId: user.groupId, role: 'user' },
        select: { id: true },
      });
      const grId = user.groupId;
      await this.prisma.notification.createMany({
        data: idsUsers.map((idUser) => ({
          toUserId: idUser.id,
          toGroupId: grId,
          authorId: decodeToken.id,
        })),
      });
      await this.redis.del(redisKey);
      return { ok: true, data: data };
    } catch {
      return { ok: false, message: 'Неизвестная ошибка' };
    }
  }
  async fetchMoreAdvertisement(dto: FetchMoreAdvertisement) {
    const { token, cursor } = dto;
    const pageSize = 30;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    if (decodeToken.role === 'sad_admin') {
      const kindergartenIds = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { kindergartenOwn: { select: { id: true } } },
      });
      if (kindergartenIds) {
        const ids = kindergartenIds.kindergartenOwn.map((k) => k.id);
        const data = await this.prisma.advertisements.findMany({
          where: { kindergartenId: { in: ids }, id: { lt: cursor } },
          select: {
            id: true,
            author: {
              select: {
                fullname: true,
                group: { select: { name: true } },
              },
            },
            createdAt: true,
            text: true,
          },
          take: pageSize + 1,
          orderBy: { createdAt: 'desc' },
        });
        const hasMore = data.length > pageSize;
        if (hasMore) {
          data.pop();
        }
        const newCursor = data.at(-1)?.id || '';
        const fullData = {
          data: data,
          hasMore: hasMore,
          cursor: newCursor,
        };
        return { data: fullData };
      } else {
        return { ok: false };
      }
    } else {
      const groupId = await this.prisma.user.findUnique({
        where: { id: decodeToken.id },
        select: { groupId: true },
      });
      if (groupId && groupId.groupId) {
        const data = await this.prisma.advertisements.findMany({
          where: { toGroupId: groupId.groupId, id: { lt: cursor } },
          select: {
            id: true,
            author: {
              select: {
                fullname: true,
                group: { select: { name: true } },
              },
            },
            createdAt: true,
            text: true,
          },
          take: pageSize + 1,
          orderBy: { id: 'desc' },
        });
        const hasMore = data.length > pageSize;
        if (hasMore) {
          data.pop();
        }
        const newCursor = data.at(-1)?.id || '';
        const fullData = {
          data: data,
          hasMore: hasMore,
          cursor: newCursor,
        };
        return { data: fullData };
      } else {
        return { ok: false };
      }
    }
  }
  async deleteAdvertisement(dto: DeleteAdvertisement) {
    const { id, token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `advertisements-${decodeToken.id}`;
    try {
      await this.prisma.advertisements.delete({ where: { id: id } });
      await this.redis.del(redisKey);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}

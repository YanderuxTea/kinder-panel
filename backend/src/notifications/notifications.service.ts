import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis.service.js';
import { GetNotifications } from './dto/get-notifications.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';
import { FetchMoreNotifications } from './dto/fetch-more-notifications.dto.js';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}
  async getNotifications(dto: GetNotifications) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `notifications-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    const pageSize = 15;
    if (cache) {
      return { data: JSON.parse(cache) };
    }
    const notifications = await this.prisma.notification.findMany({
      where: { toUserId: decodeToken.id },
      select: {
        id: true,
        isRead: true,
        author: { select: { fullname: true } },
        createdAt: true,
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = notifications.length > pageSize;
    if (hasMore) {
      notifications.pop();
    }
    const cursor = notifications.at(-1)?.id || '';
    const fullData = {
      data: notifications,
      cursor: cursor,
      hasMore: hasMore,
    };
    await this.redis.set(redisKey, JSON.stringify(fullData), 'EX', 360);
    return { data: fullData };
  }
  async fetchMoreNotifications(dto: FetchMoreNotifications) {
    const { token, cursor } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const pageSize = 15;
    const notifications = await this.prisma.notification.findMany({
      where: { toUserId: decodeToken.id, id: { lt: cursor } },
      select: {
        id: true,
        isRead: true,
        author: { select: { fullname: true } },
        createdAt: true,
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = notifications.length > pageSize;
    if (hasMore) {
      notifications.pop();
    }
    const newCursor = notifications.at(-1)?.id || '';
    const fullData = {
      data: notifications,
      cursor: newCursor,
      hasMore: hasMore,
    };
    return { data: fullData };
  }
  async readNotifications(dto: GetNotifications) {
    const { token } = dto;

    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `notifications-${decodeToken.id}`;

    try {
      await this.prisma.notification.updateMany({
        where: { toUserId: decodeToken.id, isRead: false },
        data: { isRead: true },
      });
      await this.redis.del(redisKey);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
  async deleteNotifications(dto: GetNotifications) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `notifications-${decodeToken.id}`;
    try {
      await this.prisma.notification.deleteMany({
        where: { toUserId: decodeToken.id },
      });
      await this.redis.del(redisKey);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RedisService } from '../redis.service.js';
import { FetchMoreKindergartens } from './dto/fetch-more-kindergartens.dto.js';
import { SearchKindergartens } from './dto/search-kindergartens.dto.js';
import { ChangeSubscriptions } from './dto/change-subcriptions.dto.js';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
  async fetchKindergartens() {
    const redisKey = 'kindergartens-admin-panel';
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    }
    const pageSize = 30;
    const kindergartens = await this.prisma.kindergarten.findMany({
      select: {
        id: true,
        owner: { select: { fullname: true, login: true } },
        name: true,
        address: true,
        endSubscription: true,
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = kindergartens.length > pageSize;
    if (hasMore) {
      kindergartens.pop();
    }
    const cursor = kindergartens.at(-1)?.id || '';
    const data = {
      kindergartens: kindergartens,
      cursor: cursor,
      hasMore: hasMore,
    };
    await this.redis.set(redisKey, JSON.stringify(data), 'EX', 300);
    return { data: data };
  }
  async fetchMoreKindergartens(dto: FetchMoreKindergartens) {
    const { cursor, nameKindergarten, userLogin } = dto;
    const pageSize = 30;
    const kindergartens = await this.prisma.kindergarten.findMany({
      where: {
        id: { lt: cursor },
        name: { contains: nameKindergarten, mode: 'insensitive' },
        owner: { login: { contains: userLogin, mode: 'insensitive' } },
      },
      select: {
        id: true,
        owner: { select: { fullname: true, login: true } },
        name: true,
        address: true,
        endSubscription: true,
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = kindergartens.length > pageSize;
    if (hasMore) {
      kindergartens.pop();
    }
    const newCursor = kindergartens.at(-1)?.id;
    const data = {
      kindergartens: kindergartens,
      cursor: newCursor,
      hasMore: hasMore,
    };
    return { data: data };
  }
  async searchKindergartens(dto: SearchKindergartens) {
    const { nameKindergartens, userLogin } = dto;
    const pageSize = 30;
    const kindergartens = await this.prisma.kindergarten.findMany({
      where: {
        name: { contains: nameKindergartens, mode: 'insensitive' },
        owner: { login: { contains: userLogin, mode: 'insensitive' } },
      },
      select: {
        id: true,
        owner: { select: { fullname: true, login: true } },
        name: true,
        address: true,
        endSubscription: true,
      },
      take: pageSize + 1,
      orderBy: { id: 'desc' },
    });
    const hasMore = kindergartens.length > pageSize;
    if (hasMore) {
      kindergartens.pop();
    }
    const cursor = kindergartens.at(-1)?.id || '';
    const data = {
      kindergartens: kindergartens,
      cursor: cursor,
      hasMore: hasMore,
    };
    return { data: data };
  }
  async changeSubscriptions(dto: ChangeSubscriptions) {
    const { newDate, id } = dto;
    try {
      await this.prisma.kindergarten.update({
        where: { id: id },
        data: { endSubscription: newDate, isFreeTier: false },
      });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}

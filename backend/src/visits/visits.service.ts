import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis.service.js';
import { PrismaService } from '../prisma.service.js';
import { GetChildren } from './dto/get-children.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';
import { GetInformation } from './dto/get-information.dto.js';
import { GetHistory } from './dto/get-history.dto.js';
import { FetchMoreHistory } from './dto/fetch-more-history.dto.js';
import { MarkedVisit } from './dto/marked-visit.dto.js';
import { GetKindergartenInformation } from './dto/get-kindergarten-information.dto.js';

@Injectable()
export class VisitsService {
  constructor(
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}
  async getChildren(dto: GetChildren) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const redisKey = `children-user-${decodeToken.id}`;
    const cache = await this.redis.get(redisKey);
    if (cache) {
      return { data: JSON.parse(cache) };
    }
    const children = await this.prisma.children.findMany({
      where: { parents: { some: { id: decodeToken.id } } },
      select: {
        id: true,
        name: true,
        surname: true,
      },
    });
    await this.redis.set(redisKey, JSON.stringify(children), 'EX', 360);
    return { data: children };
  }
  async getMonthInformation(dto: GetInformation) {
    const { token, month, id, year } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const monthInformation = await this.prisma.attendance.findMany({
      where: {
        childrenId: id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        children: { parents: { some: { id: decodeToken.id } } },
      },
      select: {
        mark: true,
        createdAt: true,
        reason: true,
      },
    });
    return { data: monthInformation };
  }
  async getHistoryAttendance(dto: GetHistory) {
    const { token, id } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const pageSize = 30;
    const history = await this.prisma.attendance.findMany({
      where: {
        childrenId: id,
        children: { parents: { some: { id: decodeToken.id } } },
      },
      select: { mark: true, createdAt: true, reason: true },
      take: pageSize + 1,
      orderBy: { createdAt: 'desc' },
    });
    const hasMore = history.length > pageSize;
    if (hasMore) {
      history.pop();
    }
    const cursor = history.at(-1)?.createdAt.toString() || '';
    const fullData = {
      data: history,
      hasMore,
      cursor,
    };
    return { data: fullData };
  }
  async fetchMoreHistory(dto: FetchMoreHistory) {
    const { token, id, cursor } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const pageSize = 30;
    const history = await this.prisma.attendance.findMany({
      where: {
        childrenId: id,
        children: { parents: { some: { id: decodeToken.id } } },
        createdAt: { lt: new Date(cursor) },
      },
      select: {
        mark: true,
        createdAt: true,
        reason: true,
      },
      take: pageSize + 1,
      orderBy: { createdAt: 'desc' },
    });
    const hasMore = history.length > pageSize;
    if (hasMore) {
      history.pop();
    }
    const newCursor = history.at(-1)?.createdAt.toString() || '';
    const fullData = {
      data: history,
      hasMore,
      cursor: newCursor,
    };
    return { data: fullData };
  }
  async markedVisit(dto: MarkedVisit) {
    const { mark, reason, id } = dto;
    const currentDate = new Date();
    const now = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const check = await this.prisma.attendance.findFirst({
      where: { createdAt: now, childrenId: id },
    });
    if (check) {
      try {
        await this.prisma.attendance.update({
          where: { id: check.id },
          data: { reason: reason, mark: mark },
        });
        return { ok: true };
      } catch {
        return { ok: false };
      }
    } else {
      try {
        await this.prisma.attendance.create({
          data: { mark: mark, reason: reason, childrenId: id, createdAt: now },
        });
        return { ok: true };
      } catch {
        return { ok: false };
      }
    }
  }
  async getChildrenStaff(dto: GetChildren) {
    const { token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const children = await this.prisma.children.findMany({
      where: { groupId: decodeToken.groupId },
      select: {
        id: true,
        name: true,
        surname: true,
        attendances: {
          select: { mark: true, createdAt: true, reason: true },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return { data: children };
  }
  async getKindergartenInformation(dto: GetKindergartenInformation) {
    const { id, date } = dto;
    const information = await this.prisma.group.findMany({
      where: { kindergartenId: id },
      select: {
        name: true,
        id: true,
        _count: { select: { childrens: true } },
        childrens: {
          where: { attendances: { some: { createdAt: date } } },
          select: {
            attendances: { where: { createdAt: date }, select: { mark: true } },
          },
        },
      },
    });
    return { data: information };
  }
}

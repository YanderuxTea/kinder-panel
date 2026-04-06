import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { GetGroups } from './dto/get-groups.dto.js';
import { JwtPayload } from '../jwt-payload-interface.js';
import { CreateGroup } from './dto/create-group.dto.js';
import { CreateChild } from './dto/create-child.dto.js';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async getGroups(dto: GetGroups) {
    const { id, token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const groups = await this.prisma.kindergarten.findUnique({
      where: { id: id, ownerId: decodeToken.id },
      select: {
        groups: {
          where: {
            kindergartenId: id,
          },
          select: {
            id: true,
            name: true,
            _count: { select: { childrens: true } },
            childrens: {
              select: {
                id: true,
                name: true,
                surname: true,
                dateOfBirth: true,
                group: { select: { name: true } },
                parents: { select: { fullname: true } },
              },
            },
          },
          orderBy: { id: 'desc' },
        },
      },
    });
    return { groups: groups?.groups || [] };
  }
  async createGroup(dto: CreateGroup) {
    const { name, kindergartenId, token } = dto;
    const decodeToken: JwtPayload = this.jwt.decode(token);
    const subscription = await this.prisma.kindergarten.findFirst({
      where: {
        id: kindergartenId,
        ownerId: decodeToken.id,
        endSubscription: {
          lt: new Date(),
        },
      },
    });
    if (subscription) {
      return { ok: false, message: 'Подписка просрочена' };
    }
    try {
      const res = await this.prisma.group.create({
        data: { name: name, kindergartenId: kindergartenId },
        select: {
          id: true,
          name: true,
          _count: { select: { childrens: true } },
          childrens: {
            select: {
              id: true,
              name: true,
              surname: true,
              dateOfBirth: true,
              group: { select: { name: true } },
              parents: { select: { fullname: true } },
            },
            orderBy: { id: 'desc' },
          },
        },
      });
      return { ok: true, group: res };
    } catch {
      return { ok: false, message: 'Произошла неизвестная ошибка' };
    }
  }
  async createChild(dto: CreateChild) {
    const { birthdate, surname, name, idSelectGroup, loginsParents } = dto;
    try {
      const result = await this.prisma.children.create({
        data: {
          dateOfBirth: birthdate,
          name: name,
          groupId: idSelectGroup,
          surname: surname,
          parents: {
            connect: loginsParents.map((login) => ({ login })),
          },
        },
        select: {
          id: true,
          name: true,
          surname: true,
          dateOfBirth: true,
          group: { select: { name: true } },
          parents: { select: { fullname: true } },
        },
      });
      return { ok: true, data: result };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Проверьте правильность написания логина(-ов) родителей',
      };
    }
  }
}

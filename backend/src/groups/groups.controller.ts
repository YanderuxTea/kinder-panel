import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service.js';
import { GetGroups } from './dto/get-groups.dto.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateGroup } from './dto/create-group.dto.js';
import { CreateChild } from './dto/create-child.dto.js';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('get-groups')
  getGroups(@Body() dto: GetGroups) {
    return this.groupsService.getGroups(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('create-group')
  createGroup(@Body() dto: CreateGroup) {
    return this.groupsService.createGroup(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('create-child')
  createChild(@Body() dto: CreateChild) {
    return this.groupsService.createChild(dto);
  }
}

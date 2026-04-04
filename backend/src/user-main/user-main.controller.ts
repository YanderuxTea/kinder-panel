import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserMainService } from './user-main.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { GetChildren } from './dto/get-children.dto.js';

@Controller('user-main')
export class UserMainController {
  constructor(private readonly userMainService: UserMainService) {}
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-children')
  getChildren(@Body() dto: GetChildren) {
    return this.userMainService.getChildren(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-nutrition')
  getNutrition(@Body() dto: GetChildren) {
    return this.userMainService.getNutrition(dto);
  }
}

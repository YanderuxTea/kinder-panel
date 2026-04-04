import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StaffMainService } from './staff-main.service.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { GetInformation } from './dto/get-information.dto.js';

@Controller('staff-main')
export class StaffMainController {
  constructor(private readonly staffMainService: StaffMainService) {}
  @UseGuards(AuthGuard)
  @Roles('staff')
  @Post('get-information')
  getInformation(@Body() dto: GetInformation) {
    return this.staffMainService.getInformation(dto);
  }
}

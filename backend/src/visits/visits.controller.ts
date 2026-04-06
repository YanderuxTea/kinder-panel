import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { VisitsService } from './visits.service.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { GetChildren } from './dto/get-children.dto.js';
import { GetInformation } from './dto/get-information.dto.js';
import { GetHistory } from './dto/get-history.dto.js';
import { FetchMoreHistory } from './dto/fetch-more-history.dto.js';
import { MarkedVisit } from './dto/marked-visit.dto.js';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-children')
  getChildren(@Body() dto: GetChildren) {
    return this.visitsService.getChildren(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-month-information')
  getMonthInformation(@Body() dto: GetInformation) {
    return this.visitsService.getMonthInformation(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-history')
  getHistoryAttendance(@Body() dto: GetHistory) {
    return this.visitsService.getHistoryAttendance(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('fetch-more-history')
  fetchMoreHistory(@Body() dto: FetchMoreHistory) {
    return this.visitsService.fetchMoreHistory(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user', 'staff')
  @Post('marked-visit')
  markedVisit(@Body() dto: MarkedVisit) {
    return this.visitsService.markedVisit(dto);
  }
}

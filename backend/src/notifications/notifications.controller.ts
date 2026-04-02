import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { GetNotifications } from './dto/get-notifications.dto.js';
import { FetchMoreNotifications } from './dto/fetch-more-notifications.dto.js';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('get-notifications')
  getNotifications(@Body() dto: GetNotifications) {
    return this.notificationsService.getNotifications(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('fetch-more-notifications')
  fetchMoreNotifications(@Body() dto: FetchMoreNotifications) {
    return this.notificationsService.fetchMoreNotifications(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('read-notifications')
  readNotifications(@Body() dto: GetNotifications) {
    return this.notificationsService.readNotifications(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('user')
  @Post('delete-notifications')
  deleteNotifications(@Body() dto: GetNotifications) {
    return this.notificationsService.deleteNotifications(dto);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { FetchMoreKindergartens } from './dto/fetch-more-kindergartens.dto.js';
import { SearchKindergartens } from './dto/search-kindergartens.dto.js';
import { ChangeSubscriptions } from './dto/change-subcriptions.dto.js';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}
  @UseGuards(AuthGuard)
  @Roles('gl_admin')
  @Post('fetch-kindergartens')
  fetchKindergartens() {
    return this.adminPanelService.fetchKindergartens();
  }
  @UseGuards(AuthGuard)
  @Roles('gl_admin')
  @Post('fetch-more-kindergartens')
  fetchMoreKindergartens(@Body() dto: FetchMoreKindergartens) {
    return this.adminPanelService.fetchMoreKindergartens(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('gl_admin')
  @Post('search-kindergartens')
  searchKindergartens(@Body() dto: SearchKindergartens) {
    return this.adminPanelService.searchKindergartens(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('gl_admin')
  @Post('change-subscriptions')
  changeSubscriptions(@Body() dto: ChangeSubscriptions) {
    return this.adminPanelService.changeSubscriptions(dto);
  }
}

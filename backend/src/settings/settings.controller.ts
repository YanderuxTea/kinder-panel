import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service.js';
import { GetData } from './dto/get-data.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { ChangeDataSettings } from './dto/change-data.dto.js';
import { ChangePassword } from './dto/change-password.dto.js';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @UseGuards(AuthGuard)
  @Roles('gl_admin', 'sad_admin', 'staff', 'user')
  @Post('get-data')
  getDataSettings(@Body() dto: GetData) {
    return this.settingsService.getData(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('gl_admin', 'sad_admin', 'staff', 'user')
  @Post('change-data')
  changeDataSettings(@Body() dto: ChangeDataSettings) {
    return this.settingsService.changeData(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('gl_admin', 'sad_admin', 'staff', 'user')
  @Post('change-password')
  changePassword(@Body() dto: ChangePassword) {
    return this.settingsService.changePassword(dto);
  }
}

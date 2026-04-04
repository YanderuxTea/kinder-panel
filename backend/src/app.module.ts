import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';

import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module.js';
import { GardenModule } from './garden/garden.module.js';
import { CommonModule } from './common.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { AdminPanelModule } from './admin-panel/admin-panel.module.js';
import { AccountsModule } from './accounts/accounts.module.js';
import { NutritionModule } from './nutrition/nutrition.module.js';
import { GroupsModule } from './groups/groups.module.js';
import { AdvertisementsModule } from './advertisements/advertisements.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { UserMainModule } from './user-main/user-main.module.js';
import { StaffMainModule } from './staff-main/staff-main.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    GardenModule,
    CommonModule,
    SettingsModule,
    AdminPanelModule,
    AccountsModule,
    NutritionModule,
    GroupsModule,
    AdvertisementsModule,
    NotificationsModule,
    UserMainModule,
    StaffMainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

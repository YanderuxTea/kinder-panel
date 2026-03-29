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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

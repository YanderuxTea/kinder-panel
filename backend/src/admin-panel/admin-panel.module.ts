import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service.js';
import { AdminPanelController } from './admin-panel.controller.js';

@Module({
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}

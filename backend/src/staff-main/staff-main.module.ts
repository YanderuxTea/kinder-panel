import { Module } from '@nestjs/common';
import { StaffMainService } from './staff-main.service.js';
import { StaffMainController } from './staff-main.controller.js';

@Module({
  controllers: [StaffMainController],
  providers: [StaffMainService],
})
export class StaffMainModule {}

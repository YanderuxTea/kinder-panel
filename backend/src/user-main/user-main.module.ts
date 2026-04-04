import { Module } from '@nestjs/common';
import { UserMainService } from './user-main.service.js';
import { UserMainController } from './user-main.controller.js';

@Module({
  controllers: [UserMainController],
  providers: [UserMainService],
})
export class UserMainModule {}

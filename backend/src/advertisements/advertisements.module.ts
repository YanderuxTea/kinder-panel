import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service.js';
import { AdvertisementsController } from './advertisements.controller.js';

@Module({
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule {}

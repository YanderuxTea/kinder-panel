import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { GetAdvertisements } from './dto/get-advertisements.dto.js';
import { CreateAdvertisement } from './dto/create-advertisement.dto.js';
import { DeleteAdvertisement } from './dto/delete-advertisement.dto.js';
import { FetchMoreAdvertisement } from './dto/fetch-more-advertisement.dto.js';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}
  @UseGuards(AuthGuard)
  @Roles('sad_admin', 'user', 'staff')
  @Post('get-advertisements')
  getAdvertisements(@Body() dto: GetAdvertisements) {
    return this.advertisementsService.getAdvertisements(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin', 'user', 'staff')
  @Post('fetch-more-advertisements')
  fetchMoreAdvertisements(@Body() dto: FetchMoreAdvertisement) {
    return this.advertisementsService.fetchMoreAdvertisement(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('staff')
  @Post('create-advertisement')
  createAdvertisement(@Body() dto: CreateAdvertisement) {
    return this.advertisementsService.createAdvertisement(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('staff')
  @Post('delete-advertisement')
  deleteAdvertisement(@Body() dto: DeleteAdvertisement) {
    return this.advertisementsService.deleteAdvertisement(dto);
  }
}

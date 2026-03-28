import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GardenService } from './garden.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { VerifyToken } from '../auth/dto/verify-token.dto.js';
import { CreateKindergarten } from './dto/create-kindergarten.dto.js';

@Controller('garden')
export class GardenController {
  constructor(private readonly gardenService: GardenService) {}
  @UseGuards(AuthGuard)
  @Roles('gl_admin')
  @Post('get-statistics')
  getStatistics() {
    return this.gardenService.getStatistics();
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('get-kindergartens')
  getKindergartens(@Body() dto: VerifyToken) {
    return this.gardenService.getKindergartens(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('create-kindergarten')
  createKindergarten(@Body() dto: CreateKindergarten) {
    return this.gardenService.createKindergarten(dto);
  }
}

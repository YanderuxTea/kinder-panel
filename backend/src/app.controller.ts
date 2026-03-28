import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}
  @Get()
  healthCheck() {
    return this.appService.healthCheck();
  }
}

import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service.js';
import { NutritionController } from './nutrition.controller.js';

@Module({
  controllers: [NutritionController],
  providers: [NutritionService],
})
export class NutritionModule {}

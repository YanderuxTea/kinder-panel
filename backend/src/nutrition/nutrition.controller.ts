import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NutritionService } from './nutrition.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { GetNutrition } from './dto/get-nutrition.dto.js';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('get-nutrition')
  getNutrition(@Body() dto: GetNutrition) {
    return this.nutritionService.getNutrition(dto);
  }
}

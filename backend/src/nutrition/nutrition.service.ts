import { Injectable } from '@nestjs/common';
import { GetNutrition } from './dto/get-nutrition.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class NutritionService {
  constructor(private readonly prisma: PrismaService) {}
  async getNutrition(dto: GetNutrition) {
    const { id } = dto;
    const nutrition = await this.prisma.nutrition.findMany({
      where: { kindergartenId: id },
      select: {
        id: true,
        dayWeek: true,
        afternoonSnack: true,
        afternoonSnackTime: true,
        breakfast: true,
        breakfastTime: true,
        secondBreakfast: true,
        secondBreakfastTime: true,
        lunch: true,
        lunchTime: true,
      },
    });
    return { data: nutrition };
  }
}

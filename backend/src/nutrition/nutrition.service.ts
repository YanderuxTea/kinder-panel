import { Injectable } from '@nestjs/common';
import { GetNutrition } from './dto/get-nutrition.dto.js';
import { PrismaService } from '../prisma.service.js';
import { ChangeNutrition } from './dto/change-nutrition.dto.js';

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
  async changeNutrition(dto: ChangeNutrition) {
    const { id, data, dayWeek } = dto;
    const {
      afternoonSnackTime,
      breakfastTime,
      secondBreakfastTime,
      breakfast,
      secondBreakfast,
      lunchTime,
      lunch,
      afternoonSnack,
    } = data;
    try {
      const check = await this.prisma.nutrition.findMany({
        where: { kindergartenId: id, dayWeek: dayWeek },
        select: { id: true },
      });
      if (check.length > 0) {
        await this.prisma.nutrition.update({
          where: { id: check[0].id },
          data: {
            afternoonSnack: afternoonSnack,
            afternoonSnackTime: afternoonSnackTime,
            breakfastTime: breakfastTime,
            secondBreakfastTime: secondBreakfastTime,
            secondBreakfast: secondBreakfast,
            breakfast: breakfast,
            lunch: lunch,
            lunchTime: lunchTime,
          },
        });
      } else {
        await this.prisma.nutrition.create({
          data: {
            afternoonSnack: afternoonSnack,
            afternoonSnackTime: afternoonSnackTime,
            breakfastTime: breakfastTime,
            secondBreakfastTime: secondBreakfastTime,
            secondBreakfast: secondBreakfast,
            breakfast: breakfast,
            lunch: lunch,
            lunchTime: lunchTime,
            dayWeek: dayWeek,
            kindergartenId: id,
          },
        });
      }
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
}

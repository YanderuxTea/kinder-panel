import { IsNotEmptyObject, IsNumber, IsString } from 'class-validator';

export class ChangeNutrition {
  @IsString()
  id: string;
  @IsString()
  token: string;
  @IsNotEmptyObject()
  data: {
    breakfast: string;
    secondBreakfast: string;
    lunch: string;
    afternoonSnack: string;
    breakfastTime: string;
    secondBreakfastTime: string;
    lunchTime: string;
    afternoonSnackTime: string;
  };
  @IsNumber()
  dayWeek: number;
}

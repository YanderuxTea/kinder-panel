import { IsString } from 'class-validator';

export class GetNutrition {
  @IsString()
  token: string;
  @IsString()
  id: string;
}

import { IsNumber, IsString } from 'class-validator';

export class GetInformation {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @IsNumber()
  month: number;
  @IsNumber()
  year: number;
}

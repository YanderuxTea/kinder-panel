import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class ChangeSubscriptions {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @Type(() => Date)
  @IsDate()
  newDate: Date;
}

import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetKindergartenInformation {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @Type(() => Date)
  @IsDate()
  date: Date;
}

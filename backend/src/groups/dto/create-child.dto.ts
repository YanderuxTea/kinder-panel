import { IsArray, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChild {
  @IsString()
  token: string;
  @Type(() => Date)
  @IsDate()
  birthdate: Date;
  @IsString()
  idSelectGroup: string;
  @IsArray()
  @IsString({ each: true })
  loginsParents: string[];
  @IsString()
  name: string;
  @IsString()
  surname: string;
}

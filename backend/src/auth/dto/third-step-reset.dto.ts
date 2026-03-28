import { IsString, MaxLength, MinLength } from 'class-validator';

export class ThirdStepDto {
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
  @IsString()
  code: string;
  @IsString()
  @MinLength(8)
  password: string;
}

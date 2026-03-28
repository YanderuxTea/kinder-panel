import { IsString, MaxLength, MinLength } from 'class-validator';

export class SecondStepDto {
  @IsString()
  code: string;
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
}

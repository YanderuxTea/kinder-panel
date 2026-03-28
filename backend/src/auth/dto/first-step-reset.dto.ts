import { IsString, MaxLength, MinLength } from 'class-validator';

export class FirstStepDto {
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
}

import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
}

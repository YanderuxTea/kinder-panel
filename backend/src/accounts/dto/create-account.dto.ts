import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccount {
  @IsString()
  token: string;
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
  @IsString()
  fullname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  role: string;
  @IsString()
  id: string;
  @IsString()
  groupId: string;
}

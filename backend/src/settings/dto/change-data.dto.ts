import { IsEmail, IsString, MinLength } from 'class-validator';

export class ChangeDataSettings {
  @IsString()
  @MinLength(1)
  fullname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  tel: string;
  @IsString()
  address: string;
  @IsString()
  token: string;
}

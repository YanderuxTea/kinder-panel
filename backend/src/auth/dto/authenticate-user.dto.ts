import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthenticateUser {
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  login: string;
  @IsString()
  @MinLength(8)
  password: string;
}

import { IsString, MinLength } from 'class-validator';

export class ChangePassword {
  @IsString()
  @MinLength(8)
  currentPassword: string;
  @IsString()
  @MinLength(8)
  newPassword: string;
  @IsString()
  token: string;
}

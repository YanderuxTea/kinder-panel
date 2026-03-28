import { IsString } from 'class-validator';

export class VerifyToken {
  @IsString()
  token: string;
}

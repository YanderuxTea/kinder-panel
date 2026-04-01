import { IsString } from 'class-validator';

export class CheckSub {
  @IsString()
  token: string;
}

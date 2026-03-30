import { IsString } from 'class-validator';

export class GetAccounts {
  @IsString()
  token: string;
}

import { IsString } from 'class-validator';

export class FetchMoreAccounts {
  @IsString()
  token: string;
  @IsString()
  cursor: string;
}
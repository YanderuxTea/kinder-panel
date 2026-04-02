import { IsString } from 'class-validator';

export class FetchMoreNotifications {
  @IsString()
  token: string;
  @IsString()
  cursor: string;
}
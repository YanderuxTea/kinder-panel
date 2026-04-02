import { IsString } from 'class-validator';

export class GetNotifications {
  @IsString()
  token: string;
}
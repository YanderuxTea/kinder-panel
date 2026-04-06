import { IsString } from 'class-validator';

export class GetHistory {
  @IsString()
  token: string;
  @IsString()
  id: string;
}

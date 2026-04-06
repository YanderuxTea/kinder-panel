import { IsString } from 'class-validator';

export class FetchMoreHistory {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @IsString()
  cursor: string;
}

import { IsString } from 'class-validator';

export class GetData {
  @IsString()
  token: string;
}

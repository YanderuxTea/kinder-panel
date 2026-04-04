import { IsString } from 'class-validator';

export class GetInformation {
  @IsString()
  token: string;
}

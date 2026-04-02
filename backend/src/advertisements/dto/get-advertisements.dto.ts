import { IsString } from 'class-validator';

export class GetAdvertisements {
  @IsString()
  token: string;
}

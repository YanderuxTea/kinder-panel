import { IsString } from 'class-validator';

export class FetchMoreAdvertisement {
  @IsString()
  token: string;
  @IsString()
  cursor: string;
}

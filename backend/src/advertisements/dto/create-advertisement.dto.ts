import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdvertisement {
  @IsString()
  token: string;
  @IsNotEmpty()
  @IsString()
  text: string;
}

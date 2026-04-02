import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAdvertisement {
  @IsString()
  token: string;
  @IsString()
  @IsNotEmpty()
  id: string;
}

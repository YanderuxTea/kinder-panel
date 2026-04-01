import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroup {
  @IsString()
  token: string;
  @IsString()
  @IsNotEmpty()
  kindergartenId: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
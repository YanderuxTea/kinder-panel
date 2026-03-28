import { IsString } from 'class-validator';

export class CreateKindergarten {
  @IsString()
  token: string;
  @IsString()
  name: string;
  @IsString()
  address: string;
}

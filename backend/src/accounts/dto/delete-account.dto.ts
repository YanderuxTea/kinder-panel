import { IsString } from 'class-validator';

export class DeleteAccount {
  @IsString()
  token: string;
  @IsString()
  id: string;
}

import { IsString } from 'class-validator';

export class GetGroups {
  @IsString()
  token: string;
  @IsString()
  id: string;
}

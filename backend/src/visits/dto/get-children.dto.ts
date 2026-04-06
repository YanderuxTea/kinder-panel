import { IsString } from 'class-validator';

export class GetChildren {
  @IsString()
  token: string;
}

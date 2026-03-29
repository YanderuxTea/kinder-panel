import { IsString } from 'class-validator';

export class FetchMoreKindergartens {
  @IsString()
  token: string;
  @IsString()
  cursor: string;
  @IsString()
  nameKindergarten: string;
  @IsString()
  userLogin: string;
}

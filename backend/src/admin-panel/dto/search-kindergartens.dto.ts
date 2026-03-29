import { IsString } from 'class-validator';

export class SearchKindergartens {
  @IsString()
  token: string;
  @IsString()
  nameKindergartens: string;
  @IsString()
  userLogin: string;
}

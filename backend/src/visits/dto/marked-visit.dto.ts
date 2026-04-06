import { IsString } from 'class-validator';
import { StatusAttendance } from '../../generated/prisma/enums.js';

export class MarkedVisit {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @IsString()
  mark: StatusAttendance;
  @IsString()
  reason: string;
}

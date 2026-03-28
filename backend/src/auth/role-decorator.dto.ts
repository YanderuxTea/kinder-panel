import { SetMetadata } from '@nestjs/common';
export type Role = 'gl_admin' | 'sad_admin' | 'staff' | 'user';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

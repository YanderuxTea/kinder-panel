import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/jwt-payload-interface.js';
import { Role } from './role-decorator.dto.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requests = context.switchToHttp().getRequest<Request>();
    try {
      const token = requests.body.token;
      if (typeof token === 'string') {
        const data: JwtPayload = this.jwtService.verify(token);
        const allowedRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (allowedRoles.includes(data.role)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
}

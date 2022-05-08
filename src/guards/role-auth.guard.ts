import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES } from 'src/meta-consts';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    const allowRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowRoles) {
      return true;
    }
    return allowRoles.some((role) => role === user.role);
  }
}

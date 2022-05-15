import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY, IS_ROLE_PUBLIC_KEY } from 'src/meta-consts';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const controller = context.getClass();
    const handler = context.getHandler();
    console.log(req.user);

    const isRolePublic = this.reflector.getAllAndOverride<boolean>(
      IS_ROLE_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (req.user && !isRolePublic) {
      const user_id = req.user.role.id as string;
      const permissions = await this.prisma.permission.findMany({
        where: {
          role: { some: { id: user_id } },
          controller: controller.name,
          handler: handler.name,
        },
      });
      console.log(permissions);

      if (!permissions.length) {
        throw new ForbiddenException('無角色權限');
      }
    }

    return next.handle();
  }
}

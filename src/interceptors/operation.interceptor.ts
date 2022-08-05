import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { map, Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/meta-consts';
import { OperationRecService } from '../operation-rec/operation-rec.service';

@Injectable()
export class OperationInterceptor implements NestInterceptor {
  constructor(
    private operationRecService: OperationRecService,
    private reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const reqClass = context.getClass();
    const reqHandler = context.getHandler();
    const [req, res] = context.getArgs();
    return next.handle().pipe(
      map(async (data) => {
        if (isPublic) {
          return data;
        }
        const user: User = req.user || data.user;

        if (req.method !== 'GET' && user) {
          if (req.body.password) {
            req.body.password = '***';
          }
          try {
            await this.operationRecService.create({
              controller: reqClass.name,
              handler: reqHandler.name,
              operator: { connect: { id: user.id } },
              reqBody: req.body,
              target_id: req.params.id,
              path: req.path,
              method: req.method,
            });
          } catch (err) {
            console.log(err);
            throw new InternalServerErrorException('紀錄寫入錯誤');
          }
        }

        return data;
      }),
    );
  }
}

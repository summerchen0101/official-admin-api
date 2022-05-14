import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OperationRecService } from './../operation_rec/operation_rec.service';

export function Operation() {
  return UseInterceptors(OperationInterceptor);
}
@Injectable()
export class OperationInterceptor implements NestInterceptor {
  constructor(private operationRecService: OperationRecService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const reqClass = context.getClass();
    const reqHandler = context.getHandler();
    const [req] = context.getArgs();
    return next.handle().pipe(
      map(async (data) => {
        if (req.method !== 'GET') {
          if (req.body.password) {
            req.body.password = '***';
          }
          const result = await this.operationRecService.create({
            controller: reqClass.name,
            handler: reqHandler.name,
            operator: { connect: { id: req.user.id } },
            reqBody: req.body,
            target_id: req.params.id,
            path: req.path,
            method: req.method,
          });
          console.dir(result);
        }

        return data;
      }),
    );
  }
}

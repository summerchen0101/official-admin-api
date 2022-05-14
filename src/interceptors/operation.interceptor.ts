import { OperationRecService } from './../operation_rec/operation_rec.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Operation() {
  return UseInterceptors(OperationInterceptor);
}
@Injectable()
export class OperationInterceptor<T> implements NestInterceptor {
  constructor(private operationRecService: OperationRecService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const reqClass = context.getClass();
    const reqHandler = context.getHandler();
    const [req] = context.getArgs();
    return next.handle().pipe(
      map((data) => {
        console.dir(
          {
            className: reqClass.name,
            handler: reqHandler.name,
            operator_id: req.user.id,
            params: req.params,
            reqBody: req.body,
            method: req.method,
            reqPath: req.path,
            route: req.route.path,
            resData: data,
          },
          { depth: null },
        );
        if (req.method !== 'GET') {
          this.operationRecService.create({
            controller: reqClass.name,
            handler: reqHandler.name,
            operator: { connect: { id: req.user.id } },
            reqBody: req.body,
            params: req.params,
            path: req.path,
            method: req.method,
          });
        }

        return data;
      }),
    );
  }
}

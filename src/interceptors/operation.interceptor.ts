import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Operation() {
  return UseInterceptors(OperationInterceptor);
}

export class OperationInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
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
            reqPath: req.path,
            route: req.route.path,
            resData: data,
          },
          { depth: null },
        );
        return data;
      }),
    );
  }
}

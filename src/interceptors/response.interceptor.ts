import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const controller = context.getClass().name; // 取得controller name
    const handler = context.getHandler().name; // 取得method name
    return next.handle().pipe(
      map((data) => ({
        data,
      })),
    );
  }
}

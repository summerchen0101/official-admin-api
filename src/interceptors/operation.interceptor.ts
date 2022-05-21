import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OperationRecService } from './../operation_rec/operation_rec.service';

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
        if (req.method !== 'GET' && req.user) {
          if (req.body.password) {
            req.body.password = '***';
          }
          try {
            await this.operationRecService.create({
              controller: reqClass.name,
              handler: reqHandler.name,
              operator: { connect: { id: req.user.id } },
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

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable, tap } from 'rxjs';
import { PaginateQuery } from 'src/dto/paginate-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const paginate = plainToClass(PaginateQuery, req.query);
    return next.handle().pipe(
      map(async ([list, count, meta, test]) => {
        return {
          list,
          paginate: { ...paginate, total: count },
          meta,
          test,
        };
      }),
    );
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaginateQuery } from 'src/dto/paginate-query.dto';

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return plainToClass(PaginateQuery, req.query);
  },
);

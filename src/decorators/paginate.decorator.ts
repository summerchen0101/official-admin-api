import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PaginateDto } from 'src/dto/paginate.dto';

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return plainToClass(PaginateDto, req.query);
  },
);

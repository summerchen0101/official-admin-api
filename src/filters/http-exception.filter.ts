import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(err: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '';
    if (err instanceof HttpException) {
      statusCode = err.getStatus();
      message = err.message;
    } else {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMsgMap = {
          P2002: `${err.meta.target} 重複`,
          P2025: err.meta.cause,
        };

        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        message = errMsgMap[err.code] || '';
      }
    }

    response.status(statusCode).json({
      statusCode,
      path: request.url,
      message,
      info: err,
    });
  }
}

import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './user/metas/public.meta';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('seed')
  seed() {
    return this.appService.seed();
  }
}

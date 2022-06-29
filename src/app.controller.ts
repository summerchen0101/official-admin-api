import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './user/metas/public.meta';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  root() {
    return 'PPAP';
  }

  @Get('foo')
  @Public()
  foo() {
    return this.appService.getConfigVar();
  }
}

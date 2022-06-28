import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/user/metas/public.meta';
import { SiteClientService } from './site.client.service';

@Controller('public/sites')
@Public()
export class SiteClientController {
  constructor(private readonly siteService: SiteClientService) {}

  @Get()
  findAll() {
    return this.siteService.findAll();
  }
}

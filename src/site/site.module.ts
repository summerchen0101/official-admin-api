import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { SiteClientController } from './client/site.client.controller';
import { SiteClientService } from './client/site.client.service';

@Module({
  controllers: [SiteController, SiteClientController],
  providers: [SiteService, SiteClientService],
})
export class SiteModule {}

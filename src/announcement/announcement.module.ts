import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementClientController } from './announcement.client.controller';
import { AnnouncementClientService } from './announcement.client.service';

@Module({
  controllers: [AnnouncementController, AnnouncementClientController],
  providers: [AnnouncementService, AnnouncementClientService],
})
export class AnnouncementModule {}

import { Module } from '@nestjs/common';
import { EventGroupService } from './event-group.service';
import { EventGroupController } from './event-group.controller';
import { EventGroupClientController } from './client/event-group.client.controller';
import { EventGroupClientService } from './client/event-group.client.service';

@Module({
  controllers: [EventGroupController, EventGroupClientController],
  providers: [EventGroupService, EventGroupClientService],
})
export class EventGroupModule {}

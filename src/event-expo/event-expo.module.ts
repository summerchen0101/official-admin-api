import { Module } from '@nestjs/common';
import { EventExpoService } from './event-expo.service';
import { EventExpoController } from './event-expo.controller';
import { EventExpoClientService } from './client/event-expo.client.service';
import { EventExpoClientController } from './client/event-expo.client.controller';

@Module({
  controllers: [EventExpoController, EventExpoClientController],
  providers: [EventExpoService, EventExpoClientService],
})
export class EventExpoModule {}

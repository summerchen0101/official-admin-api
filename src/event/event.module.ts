import { EventClientController } from './client/event.client.controller';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventClientService } from './client/event.client.service';

@Module({
  controllers: [EventController, EventClientController],
  providers: [EventService, EventClientService],
})
export class EventModule {}

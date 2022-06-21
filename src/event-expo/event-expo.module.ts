import { Module } from '@nestjs/common';
import { EventExpoService } from './event-expo.service';
import { EventExpoController } from './event-expo.controller';

@Module({
  controllers: [EventExpoController],
  providers: [EventExpoService]
})
export class EventExpoModule {}

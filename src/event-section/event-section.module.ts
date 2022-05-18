import { Module } from '@nestjs/common';
import { EventSectionService } from './event-section.service';
import { EventSectionController } from './event-section.controller';

@Module({
  controllers: [EventSectionController],
  providers: [EventSectionService]
})
export class EventSectionModule {}

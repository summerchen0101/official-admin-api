import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/user/metas/public.meta';
import { EventExpoClientService } from './event-expo.client.service';

@Public()
@Controller('public/event-expos')
export class EventExpoClientController {
  constructor(private readonly eventExpoService: EventExpoClientService) {}

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.eventExpoService.findOne(code);
  }
}

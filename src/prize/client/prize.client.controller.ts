import { Controller, Get, Query } from '@nestjs/common';
import { PrizeType } from '@prisma/client';
import { Public } from 'src/user/metas/public.meta';
import { PrizeClientService } from './prize.client.service';

@Public()
@Controller('public/prizes')
export class PrizeClientController {
  constructor(private readonly prizeService: PrizeClientService) {}

  @Get()
  findAll(@Query('type') type: PrizeType) {
    return this.prizeService.findAll(type);
  }
}

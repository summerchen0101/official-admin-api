import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { PrizeClientController } from './client/prize.client.controller';
import { PrizeClientService } from './client/prize.client.service';

@Module({
  controllers: [PrizeController, PrizeClientController],
  providers: [PrizeService, PrizeClientService],
})
export class PrizeModule {}

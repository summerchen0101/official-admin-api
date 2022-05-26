import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PrizeService } from './prize.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { SearchPrizesDto } from './dto/search-prizes.dto';

@Controller('prizes')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Post()
  create(@Body() createPrizeDto: CreatePrizeDto) {
    return this.prizeService.create(createPrizeDto);
  }

  @Post('batch')
  batchCreate(@Body('data') list: CreatePrizeDto[]) {
    return this.prizeService.batchCreate(list);
  }

  @Get('option')
  option() {
    return this.prizeService.option();
  }
  @Get()
  findAll(@Query() query: SearchPrizesDto) {
    return this.prizeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prizeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrizeDto: UpdatePrizeDto) {
    return this.prizeService.update(+id, updatePrizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prizeService.remove(+id);
  }
}

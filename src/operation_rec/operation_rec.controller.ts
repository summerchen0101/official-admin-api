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
import { Prisma } from '@prisma/client';
import { SearchOperationRecDto } from './dto/search-operation_rec.dto';
import { OperationRecService } from './operation_rec.service';

@Controller('operations')
export class OperationRecController {
  constructor(private readonly operationRecService: OperationRecService) {}

  @Post()
  create(@Body() body: Prisma.OperationRecCreateInput) {
    return this.operationRecService.create(body);
  }

  @Get()
  findAll(@Query() query: SearchOperationRecDto) {
    return this.operationRecService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationRecService.findOne(+id);
  }
}

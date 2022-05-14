import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OperationRecService } from './operation_rec.service';

@Controller('operation-rec')
export class OperationRecController {
  constructor(private readonly operationRecService: OperationRecService) {}

  @Post()
  create(@Body() body: Prisma.OperationRecCreateInput) {
    return this.operationRecService.create(body);
  }

  @Get()
  findAll() {
    return this.operationRecService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationRecService.findOne(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationRecService } from './operation_rec.service';
import { CreateOperationRecDto } from './dto/create-operation_rec.dto';
import { UpdateOperationRecDto } from './dto/update-operation_rec.dto';

@Controller('operation-rec')
export class OperationRecController {
  constructor(private readonly operationRecService: OperationRecService) {}

  @Post()
  create(@Body() createOperationRecDto: CreateOperationRecDto) {
    return this.operationRecService.create(createOperationRecDto);
  }

  @Get()
  findAll() {
    return this.operationRecService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationRecService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationRecDto: UpdateOperationRecDto) {
    return this.operationRecService.update(+id, updateOperationRecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationRecService.remove(+id);
  }
}

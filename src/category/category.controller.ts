import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import { plainToClass, plainToInstance } from 'class-transformer';

@Controller('categorys')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: Prisma.CategoryCreateInput) {
    return await this.categoryService.create(body);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Prisma.CategoryUpdateInput,
  ) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}

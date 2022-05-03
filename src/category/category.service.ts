import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.CategoryCreateInput) {
    const categorys = await this.prisma.category.findMany({
      where: { name: data.name },
    });
    if (categorys.length) {
      throw new BadRequestException('name in use');
    }
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    const category = await this.findOne(id);
    return this.prisma.category.update({ where: { id: category.id }, data });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.prisma.category.delete({ where: { id: category.id } });
  }
}

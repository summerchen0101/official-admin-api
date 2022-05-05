import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.category_id },
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }
    const user = await this.prisma.user.findFirst();
    const product = await this.prisma.product.findMany({
      where: { name: createProductDto.name },
    });
    if (product.length) {
      throw new BadRequestException('dupicated name');
    }
    return this.prisma.product.create({
      data: { ...createProductDto, creator_id: user.id },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return this.prisma.product.delete({ where: { id } });
  }
}

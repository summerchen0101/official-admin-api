import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchOperationRecDto } from './dto/search-operation_rec.dto';

@Injectable()
export class OperationRecService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.OperationRecCreateInput) {
    return this.prisma.operationRec.create({ data });
  }

  async findAll(search: SearchOperationRecDto) {
    const { controller, target_id, operator_id, page, perpage } = search;
    const findManyArgs: Prisma.OperationRecFindManyArgs = {
      where: {
        controller,
        operator_id,
        target_id,
      },
      include: {
        operator: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: [{ id: 'desc' }],
      take: perpage,
      skip: (page - 1) * perpage,
    };

    const [items, count] = await this.prisma.$transaction([
      this.prisma.operationRec.findMany(findManyArgs),
      this.prisma.operationRec.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: number) {
    return this.prisma.operationRec.findUnique({ where: { id } });
  }
}

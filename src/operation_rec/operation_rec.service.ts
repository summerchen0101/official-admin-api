import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchOperationRecDto } from './dto/search.operation_rec.dto';

@Injectable()
export class OperationRecService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.OperationRecCreateInput) {
    return this.prisma.operationRec.create({ data });
  }

  findAll(data: SearchOperationRecDto) {
    const { controller, target_id, operator_id } = data;
    return this.prisma.operationRec.findMany({
      where: { controller, operator_id },
    });
  }

  findOne(id: number) {
    return this.prisma.operationRec.findUnique({ where: { id } });
  }
}

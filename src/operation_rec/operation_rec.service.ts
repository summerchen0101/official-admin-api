import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationRecService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.OperationRecCreateInput) {
    const operationRec = await this.prisma.operationRec.create({ data });
    console.log(operationRec);
    return operationRec;
  }

  findAll() {
    return this.prisma.operationRec.findMany();
  }

  findOne(id: number) {
    return this.prisma.operationRec.findUnique({ where: { id } });
  }
}

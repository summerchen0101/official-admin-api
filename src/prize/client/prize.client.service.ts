import { Injectable } from '@nestjs/common';
import { PrizeType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrizeClientService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(type: PrizeType) {
    return this.prisma.prize.findMany({ where: { type } });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, PrizeType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { SearchPrizesDto } from './dto/search-prizes.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

@Injectable()
export class PrizeService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreatePrizeDto) {
    return this.prisma.prize.create({ data });
  }

  createMany(data: CreatePrizeDto[]) {
    return this.prisma.prize.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findAll(search: SearchPrizesDto) {
    const { page, perpage, type } = search;
    const findManyArgs: Prisma.PrizeFindManyArgs = {
      where: { type },
      take: perpage,
      skip: (page - 1) * perpage,
    };
    const [items, count] = await this.prisma.$transaction([
      this.prisma.prize.findMany(findManyArgs),
      this.prisma.prize.count({ where: findManyArgs.where }),
    ]);

    return {
      items,
      count,
      search,
    };
  }

  findOne(id: number) {
    return this.prisma.prize.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePrizeDto) {
    return this.prisma.prize.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.prize.delete({ where: { id } });
  }
}

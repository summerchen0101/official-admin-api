import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRawDto } from './dto/create-raw.dto';
import { UpdateRawDto } from './dto/update-raw.dto';

@Injectable()
export class RawService {
  constructor(private readonly prisma: PrismaService) {}

  create({ code, data }: CreateRawDto) {
    return this.prisma.rawData.upsert({
      where: {
        code,
      },
      update: {
        data,
      },
      create: {
        code,
        data,
      },
    });
  }
  findAll() {
    return `This action returns all raw`;
  }

  findOne(code: string) {
    return this.prisma.rawData.findUnique({ where: { code } });
  }

  update(id: number, updateRawDto: UpdateRawDto) {
    return `This action updates a #${id} raw`;
  }

  remove(id: number) {
    return `This action removes a #${id} raw`;
  }
}

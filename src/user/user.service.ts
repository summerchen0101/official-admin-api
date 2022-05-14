import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(search: SearchUserDto) {
    const { page, perpage, email, name, is_active } = search;
    const findManyArgs: Prisma.UserFindManyArgs = {
      where: {
        email,
        name,
        is_active,
      },
      orderBy: [{ id: 'desc' }],
      take: perpage || 10,
      skip: (page - 1) * perpage || 0,
    };

    const [items, count_all, count_is_active] = await this.prisma.$transaction([
      this.prisma.user.findMany(findManyArgs),
      this.prisma.user.count({ where: findManyArgs.where }),
      this.prisma.user.count({
        where: { ...findManyArgs.where, is_active: true },
      }),
    ]);

    return {
      items,
      counts: {
        all: count_all,
        is_active: count_is_active,
      },
      search,
    };
  }

  async create({ password, ...data }: Prisma.UserCreateInput): Promise<User> {
    const users = await this.prisma.user.findMany({
      where: { email: data.email },
    });
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const hash = await argon2.hash(password);
    return this.prisma.user.create({
      data: { ...data, password: hash },
    });
  }

  async update(
    id: string,
    { password, ...data }: UpdateUserDto,
  ): Promise<User> {
    if (password) {
      const hash = await argon2.hash(password);
      return this.prisma.user.update({
        where: { id },
        data: { ...data, password: hash },
      });
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      throw new BadRequestException('failed to delete');
    }
  }
}

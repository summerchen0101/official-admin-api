import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Operation } from 'src/interceptors/operation.interceptor';
import { Serilizer } from 'src/interceptors/serializer.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@Serilizer(UserDto)
@Operation()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() { role_id, ...data }: CreateUserDto) {
    return this.userService.create({
      ...data,
      role: {
        connect: { id: role_id },
      },
    });
  }

  @Get()
  findAll(@Query() query: SearchUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new BadRequestException('無此User');
      } else {
        throw new BadRequestException(err.msg);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

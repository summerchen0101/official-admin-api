import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async signup(data: SignupDto) {
    const users = await this.prisma.user.findMany({
      where: { email: data.email },
    });
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    return this.userService.create(data);
  }

  async signin({ email, password }: SigninDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('user is not exist');
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}

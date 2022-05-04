import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenService } from './auth_token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: AuthTokenService,
  ) {}

  async signup(data: SignupDto) {
    const users = await this.prisma.user.findMany({
      where: { email: data.email },
    });
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const user = await this.userService.create(data);
    const token = this.jwtService.sign({ email: user.email, sub: user.id });
    await this.tokenService.create(user.id, token);
    return {
      access_token: token,
    };
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
    const token = this.jwtService.sign({ email: user.email, sub: user.id });

    const authToken = await this.tokenService.findOne({ user_id: user.id });
    if (authToken) {
      await this.tokenService.remove({ user_id: user.id });
    }

    await this.tokenService.create(user.id, token);
    return {
      access_token: token,
    };
  }
}

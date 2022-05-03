import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serilizer } from 'src/interceptors/SerializerInterceptor';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@Serilizer(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Session() session) {
    const user = await this.authService.signup(signupDto);
    if (user) {
      session.user_id = user.id;
    }
    return user;
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto, @Session() session) {
    const user = await this.authService.signin(signinDto);
    if (user) {
      session.user_id = user.id;
    }
    return user;
  }

  @Post('signout')
  async signout(@Session() session) {
    session.user_id = null;
    return;
  }
}

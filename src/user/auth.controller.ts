import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth_token.service';
import { User } from './decorators/user.decorator';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from './metas/public.meta';

@Controller('auth')
// @Serilizer(UserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: AuthTokenService,
  ) {}

  @Get('me')
  async me(@User() user) {
    return user;
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signout')
  async signout(@Headers() headers) {
    if (headers.authorization) {
      const token = headers.authorization.replace('Bearer ', '');
      const authToken = await this.tokenService.remove({ token });
      return authToken.user_id;
    }
  }
}

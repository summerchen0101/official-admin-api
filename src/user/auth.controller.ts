import { Body, Controller, Post } from '@nestjs/common';
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
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}

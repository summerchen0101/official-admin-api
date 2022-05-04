import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthTokenService } from './auth_token.service';
import { CreateAuthTokenDto } from './dto/create-auth_token.dto';
import { UpdateAuthTokenDto } from './dto/update-auth_token.dto';

@Controller('auth-token')
export class AuthTokenController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @Post()
  create(@Body() createAuthTokenDto: CreateAuthTokenDto) {
    return this.authTokenService.create(createAuthTokenDto);
  }

  @Get()
  findAll() {
    return this.authTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthTokenDto: UpdateAuthTokenDto) {
    return this.authTokenService.update(+id, updateAuthTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authTokenService.remove(+id);
  }
}

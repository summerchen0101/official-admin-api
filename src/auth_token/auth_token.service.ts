import { Injectable } from '@nestjs/common';
import { CreateAuthTokenDto } from './dto/create-auth_token.dto';
import { UpdateAuthTokenDto } from './dto/update-auth_token.dto';

@Injectable()
export class AuthTokenService {
  create(createAuthTokenDto: CreateAuthTokenDto) {
    return 'This action adds a new authToken';
  }

  findAll() {
    return `This action returns all authToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authToken`;
  }

  update(id: number, updateAuthTokenDto: UpdateAuthTokenDto) {
    return `This action updates a #${id} authToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} authToken`;
  }
}

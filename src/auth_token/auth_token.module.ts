import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth_token.service';
import { AuthTokenController } from './auth_token.controller';

@Module({
  controllers: [AuthTokenController],
  providers: [AuthTokenService]
})
export class AuthTokenModule {}

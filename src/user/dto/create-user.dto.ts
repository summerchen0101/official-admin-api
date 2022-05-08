import { Prisma, RoleType, UserStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsEnum(RoleType)
  type: RoleType;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus;
}

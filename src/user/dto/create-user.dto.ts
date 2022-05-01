import { User as UserModal } from '@prisma/client';
export class CreateUserDto implements Partial<UserModal> {
  email: string;
  name: string;
  password: string;
}

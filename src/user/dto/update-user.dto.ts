import { User as UserModal } from '@prisma/client';
export class UpdateUserDto implements Partial<UserModal> {
  email: string;
  name: string;
  password: string;
}

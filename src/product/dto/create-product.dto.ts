import { Product } from '@prisma/client';

export class CreateProductDto implements Partial<Product> {
  name: string;
  price: number;
  active: boolean;
  category_id: number;
}

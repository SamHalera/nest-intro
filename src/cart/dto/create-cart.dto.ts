import { Item } from '../cart.service';

export class CreateCartDto {
  id: number;
  items: Item[];
}

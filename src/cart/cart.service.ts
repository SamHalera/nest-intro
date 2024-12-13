import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type Cart = {
  id: string;
  items: Item[];
};

//add all properties afo item
export type Item = {
  id: string;
  quantity: number;
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  create(cart: Cart): Cart {
    this.carts.push(cart);
    console.log('carts==>', this.carts);
    // throw new NotImplementedException();
    return cart;
  }

  getCart(id: string): Cart {
    console.log(this.carts);
    const cart = this.carts.find((item) => item.id === id);
    if (cart) {
      return cart;
    } else {
      throw new NotFoundException();
    }
    // throw new NotImplementedException();
  }

  putItem(id: string, item: Item): Cart {
    const existingCart = this.carts.find((elt) => elt.id === id);
    console.log('existingCart==>', existingCart);

    existingCart.items.push(item);

    console.log(this.carts);
    throw new NotImplementedException();
  }

  putItems(id: string, items: Item[]): Cart {
    throw new NotImplementedException();
  }
}

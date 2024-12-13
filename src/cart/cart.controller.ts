import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cart, CartService, Item } from './cart.service';
import { AddToCartDTO } from './dto/add-to-cart.dto';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  getCart(@Param('id') id: string): Cart {
    return this.cartService.getCart(id);
  }

  @Post('/')
  createCart(@Body() cart: Cart): Cart {
    console.log('cart body==>', cart);
    return this.cartService.create(cart);
  }

  @Post('/:id')
  addToCart(@Param('id') id: string, @Body() item: Item): Cart {
    return this.cartService.putItem(id, item);
  }
}

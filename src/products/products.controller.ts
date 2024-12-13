import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productService: ProductsService) {}
  @Get()
  public getProducts(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    const products = this.productService.findAll(20);

    return products;
  }

  @Post()
  public createProducts() {
    const newProdutcs = this.productService.createProduct();
  }
}

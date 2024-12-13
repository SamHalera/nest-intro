import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

// const products = [
//   {
//     id: 0,
//     imageUrl: 'https://placehold.co/400x400',
//     name: `Comics Vol1`,
//     price: 30,
//   },
//   {
//     id: 1,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol2',
//     price: 30,
//   },
//   {
//     id: 2,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol3',
//     price: 30,
//   },
//   {
//     id: 3,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol4',
//     price: 30,
//   },
//   {
//     id: 4,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol5',
//     price: 30,
//   },
//   {
//     id: 5,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol6',
//     price: 30,
//   },
//   {
//     id: 6,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol7',
//     price: 30,
//   },
//   {
//     id: 7,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol8',
//     price: 30,
//   },
//   {
//     id: 8,
//     imageUrl: 'https://placehold.co/400x400',
//     name: 'Comics Vol9',
//     price: 30,
//   },
// ];
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  public async findAll(limit: number) {
    const products = await this.productRepository.find();
    return products;
  }
  public async createProduct() {
    // products.forEach(async (item) => {
    //   const { id, ...restOfItem } = item;
    //   await this.productRepository.save(restOfItem);
    // });
  }
}

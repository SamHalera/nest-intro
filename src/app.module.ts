import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [User, Product],
        synchronize: true, //only in development mode
        port: 5433,
        username: 'postgres',
        password: 'Zamulele15$',
        host: 'localhost',
        database: 'nestjs-blog',
      }),
    }),
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

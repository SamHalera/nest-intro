import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  imageUrl: string;
}

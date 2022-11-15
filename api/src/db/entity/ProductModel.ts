/**
 * Module of the entity Product
 * @module entity/Product
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { Product } from "./Product";
import { ShoppingCartItem } from "./ShoppingCartItem";

@Entity()
export class ProductModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column({ array: true })
  sizes: string;

  @Column({ array: true })
  colors: string;

  @ManyToOne(() => Product, (product) => product.productsModels)
  product: Product;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.productModel
  )
  shoppingCartItems: ShoppingCartItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

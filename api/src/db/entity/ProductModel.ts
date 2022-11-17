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
import { Variation } from "./Variation";

@Entity()
export class ProductModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.productsModels)
  product: Product;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.productModel
  )
  shoppingCartItems: ShoppingCartItem[];

  @OneToMany(() => Variation, (variation) => variation.productModel)
  variations: Variation[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

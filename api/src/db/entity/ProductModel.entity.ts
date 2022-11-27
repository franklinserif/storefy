/**
 * Module of the entity Product model
 * @module entity/ProductModel
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

import { Product } from "./Product.entity";
import { ShoppingCartItem } from "./ShoppingCartItem.entity";
import { Variation } from "./Variation.entity";

@Entity()
export class ProductModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @Column({ type: "real" })
  price: number;

  @ManyToOne(() => Product, (product) => product.productsModels)
  product: Product;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.productModel
  )
  shoppingCartItems: ShoppingCartItem[];

  @OneToMany(() => Variation, (variation) => variation.productModel, {
    eager: true,
    cascade: true,
  })
  variations: Variation[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

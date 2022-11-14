/**
 * Module of the entity Shopping cart item
 * @module entity/ShoppingCartItem
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  Column,
} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";
import { ProductModel } from "./ProductModel";

@Entity()
export class ShoppingCartItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartItems
  )
  shoppingCart: ShoppingCart;

  @ManyToOne(
    () => ProductModel,
    (productModel) => productModel.shoppingCartItems
  )
  productModel: ProductModel;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

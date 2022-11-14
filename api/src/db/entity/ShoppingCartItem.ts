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
} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";
import { ProductModel } from "./ProductModel";

@Entity()
export class ShoppingCartItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartItems
  )
  shoppingCart: ShoppingCart;

  @ManyToOne(
    () => ProductModel,
    (productModel) => productModel.shoppingCartItems
  )
  product: ProductModel;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

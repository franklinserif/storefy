/**
 * Module of the entity shopping cart
 * @module entity/ShoppingCart
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ShoppingCartItem } from "./ShoppingCartItem";

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.shoppingCart
  )
  shoppingCartItem: ShoppingCartItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

/**
 * Module of the entity Shopping cart item
 * @module entity/ShoppingCartItem
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";
import { Variation } from "./Variation";

@Entity()
export class ShoppingCartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: Number;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartItem
  )
  shoppingCart: ShoppingCart;

  @OneToMany(() => Variation, (variation) => variation.shoppingCartItem)
  variations: Variation[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

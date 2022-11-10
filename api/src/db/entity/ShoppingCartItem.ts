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
  BaseEntity,
} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";

@Entity()
export class ShoppingCartItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  color: string;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartItems
  )
  shoppingCart: ShoppingCart;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

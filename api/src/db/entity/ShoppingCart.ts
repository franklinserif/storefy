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
  ManyToOne,
  BaseEntity,
  Column,
} from "typeorm";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { User } from "./User";

@Entity()
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  total: number;

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  user: User;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.shoppingCart
  )
  shoppingCartItems: ShoppingCartItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

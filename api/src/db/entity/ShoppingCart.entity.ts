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
import { ShoppingCartItem } from "./ShoppingCartItem.entity";
import { User } from "./User.entity";

@Entity()
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "real" })
  total: number;

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  user: User;

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.shoppingCart,
    { eager: true, onDelete: "CASCADE" }
  )
  shoppingCartItems: ShoppingCartItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

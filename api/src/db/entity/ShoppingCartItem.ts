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
  BaseEntity,
} from "typeorm";
import { ShoppingCart } from "./ShoppingCart";
import { VariationOption } from "./VariationOption";

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

  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.shoppingCartItem
  )
  variationOptions: VariationOption[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

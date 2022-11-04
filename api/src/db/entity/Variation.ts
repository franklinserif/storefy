/**
 * Module of variation entity
 * @module entity/variation
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Category } from "./Category";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { VariationOption } from "./VariationOption";

@Entity()
export class Variation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation
  )
  variationOptions: VariationOption[];

  @ManyToOne(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.variations
  )
  shoppingCartItem: ShoppingCartItem;

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

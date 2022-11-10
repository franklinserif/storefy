/**
 * Module of variation option entity
 * @module entity/variationOption
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Variation } from "./Variation";
import { ShoppingCartItem } from "./ShoppingCartItem";

@Entity()
export class VariationOption extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @Column()
  qty: Number;

  @ManyToOne(() => Variation, (variation) => variation.variationOptions)
  variation: Variation;

  @CreateDateColumn({ name: "create_at" })
  createAt: string;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: string;
}

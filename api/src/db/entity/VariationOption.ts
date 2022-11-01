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
} from "typeorm";
import { Variation } from "./Variation";

@Entity()
export class VariationOption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  qty: Number;

  @ManyToOne(() => Variation, (variation) => variation.variationOptions)
  variation: Variation;

  @CreateDateColumn({ name: "create_at" })
  createAt: string;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: string;
}

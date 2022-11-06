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
  BaseEntity,
} from "typeorm";
import { Category } from "./Category";
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

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

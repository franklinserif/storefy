/**
 * Module of the entity Product configuration
 * @module entity/ProductConfiguration
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { VariationOption } from "./VariationOption";
import { Product } from "./Product";

@Entity()
export class ProductConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @ManyToMany(() => VariationOption)
  @JoinTable()
  variationOptions: VariationOption[];

  @ManyToOne(() => Product, (product) => product.productsConfiguration)
  product: Product;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

/**
 * Module of the entity Image
 * @module entity/Image
 */

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  size: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @CreateDateColumn({ name: "update_at" })
  updateAt: Date;
}

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
import { ProductModel } from "./ProductModel.entity";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @ManyToOne(() => ProductModel, (productModel) => productModel.images)
  productModel: ProductModel;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @CreateDateColumn({ name: "update_at" })
  updateAt: Date;
}

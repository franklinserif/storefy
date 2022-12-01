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
  BeforeRemove,
} from "typeorm";
import { ProductModel } from "./ProductModel.entity";
import { deleteImageFromS3 } from "../../utils/S3";

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

  @BeforeRemove()
  async removeImage() {
    await deleteImageFromS3(this.name);
  }
}

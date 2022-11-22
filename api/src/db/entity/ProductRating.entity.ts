/**
 * Module of Product rating
 * @module entity/ProductRating
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { Product } from "./Product.entity";
import { User } from "./User.entity";

@Entity()
export class ProductRating extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rating: Number;

  @ManyToOne(() => Product, (product) => product.productsRating)
  product: Product;

  @ManyToOne(() => User, (user) => user.productRating)
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: string;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: string;
}

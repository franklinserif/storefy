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
} from "typeorm";

import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class ProductRating {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: Number;

  @ManyToOne(() => Product, (product) => product.productRating)
  product: Product;

  @ManyToOne(() => User, (user) => user.productRating)
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: string;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: string;
}

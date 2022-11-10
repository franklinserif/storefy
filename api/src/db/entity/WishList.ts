/**
 * Module of WishList
 * @module entity/WishList
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Product } from "./Product";

@Entity()
export class WishList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: Number;

  @OneToMany(() => Product, (products) => products.wishList)
  products: Product[];

  @CreateDateColumn({ name: "create_at" })
  createAt: string;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: string;
}

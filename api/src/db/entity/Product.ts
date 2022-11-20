/**
 * Module of the entity Product
 * @module entity/Product
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { ProductModel } from "./ProductModel";
import { Category } from "./Category";
import { ProductRating } from "./ProductRating";
import { Review } from "./Review";
import { WishList } from "./WishList";
import { User } from "./User";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ProductModel, (productModel) => productModel.product, {
    eager: true,
    cascade: ["remove"],
  })
  productsModels: ProductModel[];

  @OneToMany(() => Review, (review) => review.product, { eager: true })
  reviews: Review[];

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => ProductRating, (productRating) => productRating.product, {
    eager: true,
  })
  productsRating: ProductRating[];

  @ManyToOne(() => WishList, (wishList) => wishList.products, { eager: true })
  wishList: WishList;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

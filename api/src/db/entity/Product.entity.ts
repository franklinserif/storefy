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

import { ProductModel } from "./ProductModel.entity";
import { Category } from "./Category.entity";
import { ProductRating } from "./ProductRating.entity";
import { Review } from "./Review.entity";
import { WishList } from "./WishList.entity";
import { User } from "./User.entity";
import { Image } from "./Image.entity";

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
    cascade: true,
  })
  productsModels: ProductModel[];

  @OneToMany(() => Review, (review) => review.product, {
    eager: true,
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => ProductRating, (productRating) => productRating.product, {
    eager: true,
    onDelete: "CASCADE",
  })
  productsRating: ProductRating[];

  @ManyToOne(() => WishList, (wishList) => wishList.products)
  wishList: WishList;

  @OneToMany(() => Image, (images) => images.product)
  images: Image[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

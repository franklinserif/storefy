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

import { Category } from "./Category";
import { ProductRating } from "./ProductRating";
import { Review } from "./Review";
import { WishList } from "./WishList";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { User } from "./User";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  sizes: string[];

  @Column()
  colors: string[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(
    () => ShoppingCartItem,
    (shoppingCartItem) => shoppingCartItem.product
  )
  shoppingCartItems: ShoppingCartItem[];

  @OneToMany(() => ProductRating, (productRating) => productRating.product)
  productsRating: ProductRating[];

  @ManyToOne(() => WishList, (wishList) => wishList.products)
  wishList: WishList;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

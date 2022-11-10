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
import { Variation } from "./Variation";
import { ProductRating } from "./ProductRating";
import { Review } from "./Review";
import { ProductConfiguration } from "./ProductConfiguration";
import { WishList } from "./WishList";

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Variation)
  @JoinTable()
  variations: Variation[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductRating, (productRating) => productRating.product)
  productsRating: ProductRating[];

  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.product
  )
  productsConfiguration: ProductConfiguration[];

  @ManyToOne(() => WishList, (wishList) => wishList.products)
  wishList: WishList;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

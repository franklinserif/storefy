/**
 * Contains all User entity model columns and relationships
 * @module entity/User
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import { ProductRating } from "./ProductRating";
import { Review } from "./Review";
import { ShoppingCart } from "./ShoppingCart";
import { WishList } from "./WishList";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: "email_address" })
  email: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ name: "is_active" })
  isActive: boolean;

  @Column({ name: "confirm_code" })
  confirmCode: number;

  @Column({ name: "street_number" })
  streetNumber: Number;

  @Column({ name: "address_line1" })
  addressLine1: Number;

  @Column({ name: "address_line2" })
  addressLine2: Number;

  @Column()
  city: String;

  @Column()
  region: String;

  @Column({ name: "postal_code" })
  postalCode: Number;

  @OneToMany(() => ProductRating, (ProductRating) => ProductRating.user)
  productRating: ProductRating[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => ShoppingCart, (shopingCart) => shopingCart.user)
  shoppingCarts: ShoppingCart[];

  @OneToOne(() => WishList)
  @JoinColumn()
  wishList: WishList;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

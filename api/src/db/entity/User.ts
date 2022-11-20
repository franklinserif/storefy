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
import { Product } from "./Product";
import { Payment } from "./Payment";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  roles: string;

  @Column({ name: "email_address", unique: true })
  email: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNumber: string;

  @Column({ name: "is_active", default: false })
  isActive: boolean;

  @Column({ name: "confirm_code", nullable: true, default: 0 })
  confirmCode: number;

  @Column({ name: "street_number", nullable: true })
  streetNumber: Number;

  @Column({ name: "address_line1", nullable: true })
  addressLine1: string;

  @Column({ name: "address_line2", nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  city: String;

  @Column({ nullable: true })
  region: String;

  @Column({ name: "postal_code", nullable: true })
  postalCode: Number;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: ["remove"],
  })
  products: Product[];

  @OneToMany(() => ProductRating, (ProductRating) => ProductRating.user)
  productRating: ProductRating[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => ShoppingCart, (shopingCart) => shopingCart.user, {
    cascade: ["remove"],
  })
  shoppingCarts: ShoppingCart[];

  @OneToOne(() => WishList, {
    cascade: ["remove"],
  })
  @JoinColumn()
  wishList: WishList;

  @OneToOne(() => Payment, {
    cascade: ["remove"],
  })
  @JoinColumn()
  payment: Payment;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

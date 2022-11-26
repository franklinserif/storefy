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

import { ProductRating } from "./ProductRating.entity";
import { Review } from "./Review.entity";
import { ShoppingCart } from "./ShoppingCart.entity";
import { WishList } from "./WishList.entity";
import { Product } from "./Product.entity";
import { Payment } from "./Payment.entity";

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
    eager: true,
    onDelete: "CASCADE",
  })
  products: Product[];

  @OneToMany(() => ProductRating, (ProductRating) => ProductRating.user, {
    eager: true,
  })
  productRating: ProductRating[];

  @OneToMany(() => Review, (review) => review.user, { eager: true })
  reviews: Review[];

  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @OneToOne(() => WishList, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  wishList: WishList;

  @OneToOne(() => Payment, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  payment: Payment;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

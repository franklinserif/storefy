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
} from "typeorm";

import { ProductRating } from "./ProductRating";
import { Review } from "./Review";
import { ShoppingCart } from "./ShoppingCart";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: "email_address" })
  emailAddress: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ name: "is_active" })
  isActive: boolean;

  @Column({ name: "unit_number" })
  unitNumber: Number;

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

  @OneToOne(() => ShoppingCart)
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

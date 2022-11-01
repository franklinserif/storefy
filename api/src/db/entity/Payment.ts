/**
 * module of payment entity
 * @module entity/Payment
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column({ name: "account_number" })
  accountNumber: string;

  @Column({ name: "expire_date" })
  expiryDate: String;

  @Column({ name: "payment_type" })
  paymentType: Boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

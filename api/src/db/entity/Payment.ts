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
  BaseEntity,
} from "typeorm";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column({ name: "account_number" })
  accountNumber: number;

  @Column({ name: "expire_date" })
  expiryDate: Date;

  @Column({ name: "payment_type" })
  paymentType: String;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

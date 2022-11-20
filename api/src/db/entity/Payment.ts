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

  @Column({ nullable: true })
  provider: string;

  @Column({ name: "account_number", nullable: true })
  accountNumber: number;

  @Column({ name: "expire_date", nullable: true })
  expiryDate: Date;

  @Column({ name: "payment_type", nullable: true })
  paymentType: string;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

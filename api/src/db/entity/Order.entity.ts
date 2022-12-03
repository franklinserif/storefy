/**
 * Order entity
 * @module entity/order
 */

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User.entity";
import { OrderItem } from "./OrderItem.entity";

export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "real", default: 0 })
  total: number;

  @OneToOne(() => User, (user) => user.order)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true,
  })
  orderItem: OrderItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @CreateDateColumn({ name: "update_at" })
  updateAt: Date;
}

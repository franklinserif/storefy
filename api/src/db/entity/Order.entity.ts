/**
 * Order entity
 * @module entity/order
 */

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
} from "typeorm";

import { User } from "./User.entity";
import { OrderItem } from "./OrderItem.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "real", default: 0 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItem[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @CreateDateColumn({ name: "update_at" })
  updateAt: Date;
}

/**
 * Order product item entity
 * @module entity/OrderItem
 */

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Order } from "./Order.entity";

export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  qty: number;

  @Column({ type: "real", default: 0 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  order: Order;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @CreateDateColumn({ name: "update_at" })
  updateAt: Date;
}

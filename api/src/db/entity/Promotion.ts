/**
 * Module of the entity promotion
 * @module entity/Promotion
 */

import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: String;

  @Column()
  description: String;

  @Column({ name: "discount_rate" })
  discountRate: Number;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

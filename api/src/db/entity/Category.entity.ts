/**
 * Module of the entity categories
 * @module entity/Category
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  TreeParent,
  TreeChildren,
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { Promotion } from "./Promotion.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  image: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @ManyToOne(() => Promotion, (promotion) => promotion.categories)
  promotion: Promotion;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

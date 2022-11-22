import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Entity,
} from "typeorm";
import { Variation } from "./Variation.entity";

@Entity()
export class VariationOption extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => Variation, (variation) => variation.variationOptions)
  variation: Variation;
}

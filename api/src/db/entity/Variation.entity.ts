import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  Entity,
} from "typeorm";
import { ProductModel } from "./ProductModel.entity";
import { VariationOption } from "./VariationOption.entity";

@Entity()
export class Variation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ProductModel, (productModel) => productModel.variations)
  productModel: ProductModel;

  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation,
    { eager: true, cascade: true }
  )
  variationOptions: VariationOption[];
}

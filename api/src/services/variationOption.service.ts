/**
 * VariationOption service related to variation option crud operation
 * @module utils/variationOption
 */

import { VariationOption } from "../db/entity/VariationOption.entity";
import { IVariationOption } from "../index.type";
import boom from "@hapi/boom";

export default class VariationOptionService {
  /**
   * Create a variation option
   * @async
   * @param data``
   * @returns Promise
   */
  async create(data: Omit<IVariationOption, "id">) {
    const variationOption = VariationOption.create();
    variationOption.value = data.value;

    await variationOption.save();

    return variationOption;
  }

  /**
   * Find all a variation options
   * @async
   * @returns Promise
   */
  async findAll() {
    const variation = await VariationOption.find();

    return variation;
  }

  /**
   * Find variation option by id
   * @async
   * @param  id variation option id
   * @returns
   */
  async findOne(id: string) {
    const variationOption = await VariationOption.findOneBy({ id });

    if (!variationOption) throw boom.notFound();

    return variationOption;
  }

  /**
   * Update variation option data
   * @async
   * @param id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IVariationOption>) {
    const updatedVariationOption = await VariationOption.update(id, data);

    if (!updatedVariationOption) throw boom.notFound();

    return updatedVariationOption;
  }

  /**
   * Remove variation option from db
   * @async
   * @param id
   * @returns Promise
   */
  async delete(id: string) {
    const variationOption = await this.findOne(id);

    await variationOption.remove();

    return true;
  }
}

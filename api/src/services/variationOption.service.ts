/**
 * Variation option service related to variation option crud operation
 * @module utils/VariationOption
 */

import { VariationOption } from "../db/entity/VariationOption";
import { IVariationOption } from "../index.type";
import boom from "@hapi/boom";

export default class VariationOptionService {
  /**
   * Create a variation option
   * @async
   * @param {Omit<IVariationOption, "id">}
   * @returns {Promise<IVariationOption>}
   */
  async create(data: Omit<IVariationOption, "id">) {
    const variationOption = await VariationOption.create(data);

    return variationOption;
  }

  /**
   * Find all a variation option
   * @async
   * @returns {Promise<IVariationOption>}
   */
  async findAll() {
    const variationOption = await VariationOption.find();

    return variationOption;
  }

  /**
   * Find variation option by id
   * @async
   * @param {string} id variation option id
   * @returns {Promise<IVariationOption>}
   */
  async findOne(id: string) {
    const variationOption = await VariationOption.findOneBy({ id });

    if (!variationOption) throw boom.notFound();

    return variationOption;
  }

  /**
   * Update variation option data
   * @async
   * @param {string} id variation option id
   * @param {Partial<IVariationOption>} data to update
   * @returns {Promise<IVariationOption>}
   */
  async update(id: string, data: Partial<IVariationOption>) {
    const updatedVariationOption = await VariationOption.update(id, data);

    if (!updatedVariationOption) throw boom.notFound();

    return updatedVariationOption;
  }

  /**
   * Remove variation option from db
   * @async
   * @param {string} id variation option id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const variationOption = await this.findOne(id);

    variationOption.remove();

    return true;
  }
}

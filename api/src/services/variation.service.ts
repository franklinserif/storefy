/**
 * Variation service related to variation crud operation
 * @module utils/variation
 */

import { Variation } from "../db/entity/Variation";
import { IVariation } from "../index.type";
import boom from "@hapi/boom";

export default class VariationService {
  /**
   * Create a variation
   * @async
   * @param data``
   * @returns Promise
   */
  async create(data: Omit<IVariation, "id">) {
    const variation = Variation.create();
    variation.name = data.name;

    await variation.save();

    return variation;
  }

  /**
   * Find all a variation
   * @async
   * @returns Promise
   */
  async findAll() {
    const variation = await Variation.find();

    return variation;
  }

  /**
   * Find variation by id
   * @async
   * @param  id variation id
   * @returns
   */
  async findOne(id: string) {
    const variation = await Variation.findOneBy({ id });

    if (!variation) throw boom.notFound();

    return variation;
  }

  /**
   * Update variation data
   * @async
   * @param id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IVariation>) {
    const updatedVariation = await Variation.update(id, data);

    if (!updatedVariation) throw boom.notFound();

    return updatedVariation;
  }

  /**
   * Remove variation from db
   * @async
   * @param id
   * @returns Promise
   */
  async delete(id: string) {
    const variation = await this.findOne(id);

    await variation.remove();

    return true;
  }
}

/**
 * Variation service related to variation crud operation
 * @module utils/Variation
 */

import { Variation } from "../db/entity/Variation";
import { IVariation } from "../index.type";
import boom from "@hapi/boom";

export default class CategoryService {
  /**
   * Create a variation
   * @async
   * @param {Omit<IVariation, "id">}
   * @returns {Promise<IVariation>}
   */
  async create(data: Omit<IVariation, "id">) {
    const variation = await Variation.create(data as Variation);

    return variation;
  }

  /**
   * Find all a variation
   * @async
   * @returns {Promise<IVariation>}
   */
  async findAll() {
    const variation = await Variation.find();

    return variation;
  }

  /**
   * Find variation by id
   * @async
   * @param {string} id variation id
   * @returns {Promise<IVariation>}
   */
  async findOne(id: string) {
    const variation = await Variation.findOneBy({ id });

    if (!variation) throw boom.notFound();

    return variation;
  }

  /**
   * Update variation data
   * @async
   * @param {string} id variation id
   * @param {Partial<IVariation>} data to update
   * @returns {Promise<IVariation>}
   */
  async update(id: string, data: Partial<IVariation>) {
    const updatedVariation = await Variation.update(id, data);

    if (!updatedVariation) throw boom.notFound();

    return updatedVariation;
  }

  /**
   * Remove variation from db
   * @async
   * @param {string} id variation id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const variation = await this.findOne(id);

    variation.remove();

    return true;
  }
}

/**
 *   service related to promotion crud operation
 * @module utils/promotion
 */

import { Promotion } from "../db/entity/Promotion";
import { IPromotion } from "../index.type";
import boom from "@hapi/boom";

export default class PromotionService {
  /**
   * Create a promotion
   * @async
   * @param {Omit<IPromotion, "id">}
   * @returns {Promise<IPromotion>}
   */
  async create(data: Omit<IPromotion, "id">) {
    const promotion = await Promotion.create(data);

    return promotion;
  }

  /**
   * Find all a promotion
   * @async
   * @returns {Promise<IPromotion>}
   */
  async findAll() {
    const promotion = await Promotion.find();

    return promotion;
  }

  /**
   * Find promotion by id
   * @async
   * @param {string} id promotion id
   * @returns {Promise<IPromotion>}
   */
  async findOne(id: string) {
    const promotion = await Promotion.findOneBy({ id });

    if (!promotion) throw boom.notFound();

    return promotion;
  }

  /**
   * Update promotion data
   * @async
   * @param {string} id promotion id
   * @param {Partial<IPromotion>} data to update
   * @returns {Promise<IPromotion>}
   */
  async update(id: string, data: Partial<IPromotion>) {
    const updatedPromotion = await Promotion.update(id, data);

    if (!updatedPromotion) throw boom.notFound();

    return updatedPromotion;
  }

  /**
   * Remove promotion from db
   * @async
   * @param {string} id promotion id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const promotion = await this.findOne(id);

    promotion.remove();

    return true;
  }
}

/**
 *   service related to promotion crud operation
 * @module utils/promotion
 */

import { Promotion } from "../db/entity/Promotion";
import { IPromotion } from "../index.type";
import boom from "@hapi/boom";
import CategoryService from "./category.service";

/**
 * contains all related methods to category crud operations
 * @const
 */
const categoryService = new CategoryService();

export default class PromotionService {
  /**
   * Create a promotion
   * @async
   * @param categoryId
   * @param data
   * @returns Promise
   */
  async create(categoryId: string, data: Omit<IPromotion, "id">) {
    const category = await categoryService.findOne(categoryId);
    const promotion = Promotion.create(data);

    promotion.categories.push(category);
    await promotion.save();

    return promotion;
  }

  /**
   * Find all a promotion
   * @async
   * @returns Promise
   */
  async findAll() {
    const promotion = await Promotion.find();

    return promotion;
  }

  /**
   * Find promotion by id
   * @async
   * @param id promotion id
   * @returns Promise
   */
  async findOne(id: string) {
    const promotion = await Promotion.findOneBy({ id });

    if (!promotion) throw boom.notFound();

    return promotion;
  }

  /**
   * Update promotion data
   * @async
   * @param id promotion id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IPromotion>) {
    const updatedPromotion = await Promotion.update(id, data);

    if (!updatedPromotion) throw boom.notFound();

    return updatedPromotion;
  }

  /**
   * Remove promotion from db
   * @async
   * @param id promotion id
   * @returns Promise
   */
  async delete(id: string) {
    const promotion = await this.findOne(id);

    await promotion.remove();

    return true;
  }

  /**
   * Remove promotions from categories
   * @async
   * @param categoryId
   * @param promotionId
   * @returns Promise
   */
  async removeCategory(categoryId: string, promotionId: string) {
    const promotion = await this.findOne(promotionId);

    promotion.categories = promotion.categories.filter(
      (category) => category.id !== categoryId
    );

    await promotion.save();

    return promotion;
  }
}

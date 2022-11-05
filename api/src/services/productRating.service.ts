/**
 * Product rating service related to product rating crud operation
 * @module utils/ProductRating
 */

import { ProductRating } from "../db/entity/ProductRating";
import { IProductRating } from "../index.type";
import boom from "@hapi/boom";

export default class ProductRatingService {
  /**
   * Create a product rating
   * @async
   * @param {Omit<IProductRating, "id">}
   * @returns {Promise<IProductRating>}
   */
  async create(data: Omit<IProductRating, "id">) {
    const productRating = await ProductRating.create(data);

    return productRating;
  }

  /**
   * Find all a product rating
   * @async
   * @returns {Promise<IProductRating>}
   */
  async findAll() {
    const productRating = await ProductRating.find();

    return productRating;
  }

  /**
   * Find product rating by id
   * @async
   * @param {string} id product rating id
   * @returns {Promise<IProductRating>}
   */
  async findOne(id: string) {
    const productRating = await ProductRating.findOneBy({ id });

    if (!productRating) throw boom.notFound();

    return productRating;
  }

  /**
   * Update product rating data
   * @async
   * @param {string} id product rating id
   * @param {Partial<IProductRating>} data to update
   * @returns {Promise<IProductRating>}
   */
  async update(id: string, data: Partial<ProductRating>) {
    const updatedProductRating = await ProductRating.update(id, data);

    if (!updatedProductRating) throw boom.notFound();

    return updatedProductRating;
  }

  /**
   * Remove product rating from db
   * @async
   * @param {string} id product rating id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const productRating = await this.findOne(id);

    productRating.remove();

    return true;
  }
}

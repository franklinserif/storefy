/**
 * Review service related to review crud operation
 * @module utils/review
 */

import { Review } from "../db/entity/Review";
import { IReview } from "../index.type";
import boom from "@hapi/boom";

export default class ReviewService {
  /**
   * Create a review
   * @async
   * @param {Omit<IReview, "id">}
   * @returns {Promise<IReview>}
   */
  async create(data: Omit<IReview, "id">) {
    const review = await Review.create(data as Review);

    return review;
  }

  /**
   * Find all a review
   * @async
   * @returns {Promise<IReview>}
   */
  async findAll() {
    const review = await Review.find();

    return review;
  }

  /**
   * Find review by id
   * @async
   * @param {string} id review id
   * @returns {Promise<IReview>}
   */
  async findOne(id: string) {
    const review = await Review.findOneBy({ id });

    if (!review) throw boom.notFound();

    return review;
  }

  /**
   * Update review data
   * @async
   * @param {string} id review id
   * @param {Partial<IReview>} data to update
   * @returns {Promise<IReview>}
   */
  async update(id: string, data: Partial<IReview>) {
    const updatedReview = await Review.update(id, data);

    if (!updatedReview) throw boom.notFound();

    return updatedReview;
  }

  /**
   * Remove review from db
   * @async
   * @param {string} id review id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const review = await this.findOne(id);

    review.remove();

    return true;
  }
}

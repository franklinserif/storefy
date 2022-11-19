/**
 * Review service related to review crud operation
 * @module utils/review
 */

import { Review } from "../db/entity/Review";
import { IReview } from "../index.type";
import boom from "@hapi/boom";
import ProductService from "./product.service";
import UserService from "./user.service";
/**
 * contains all product methods for crud operations
 * @const
 */
const productService = new ProductService();

/**
 * contains all user methods for crud operations
 * @const
 */
const userService = new UserService();

export default class ReviewService {
  /**
   * Create a review
   * @async
   * @param userId
   * @param productId
   * @param data
   * @returns Promise
   */
  async create(
    userId: string,
    productId: string,
    data: Omit<IReview, "id" | "productId" | "userId">
  ) {
    const user = await userService.findOne(userId);
    const product = await productService.findOne(productId);
    const review = Review.create(data as Review);

    product.reviews.push(review);
    await product.save();
    user.reviews.push(review);
    await user.save();

    return review;
  }

  /**
   * Find all a review
   * @async
   * @returns Promise
   */
  async findAll() {
    const review = await Review.find();

    return review;
  }

  /**
   * Find review by id
   * @async
   * @param id review id
   * @returns Promise
   */
  async findOne(id: string) {
    const review = await Review.findOneBy({ id });

    if (!review) throw boom.notFound();

    return review;
  }

  /**
   * Update review data
   * @async
   * @param id review id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IReview>) {
    const updatedReview = await Review.update(id, data);

    if (!updatedReview) throw boom.notFound();

    return updatedReview;
  }

  /**
   * Remove review from db
   * @async
   * @param id review id
   * @returns Promise
   */
  async delete(id: string) {
    const review = await this.findOne(id);

    await review.remove();

    return true;
  }
}

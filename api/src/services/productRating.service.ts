/**
 * Product rating service related to product rating crud operation
 * @module services/ProductRating
 */

import { ProductRating } from "../db/entity/ProductRating.entity";
import { IProductRating } from "../index.type";
import boom from "@hapi/boom";
import UserService from "./user.service";
import ProductService from "./product.service";

/**
 * User service for crud operations
 * @const
 */
const userService = new UserService();

/**
 * Product service for crud operations
 * @const
 */
const productService = new ProductService();

export default class ProductRatingService {
  /**
   * Create a product rating
   * @async
   * @param userId
   * @param productId
   * @param data
   * @returns Promise
   */
  async create(
    userId: string,
    productId: string,
    data: Omit<IProductRating, "id" | "userId" | "productId">
  ) {
    const user = await userService.findOne(userId);
    const productRating = ProductRating.create(data);
    const product = await productService.findOne(productId);

    const relationAlreadyExist = user.productRating.find(
      (model) => model.product.id === productId
    );

    if (relationAlreadyExist)
      throw boom.conflict("you have already given a rating to this product");

    await productRating.save();
    product.productsRating.push(productRating);
    await product.save();
    user.productRating.push(productRating);
    await user.save();

    return productRating;
  }

  /**
   * Find all a product rating
   * @async
   * @returns Promise
   */
  async findAll() {
    const productRating = await ProductRating.find();

    return productRating;
  }

  /**
   * Find product rating by id
   * @async
   * @param id product rating id
   * @returns Promise
   */
  async findOne(id: string) {
    const productRating = await ProductRating.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!productRating) throw boom.notFound();

    return productRating;
  }

  /**
   * Update product rating data
   * @async
   * @param id product rating id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<ProductRating>) {
    const updatedProductRating = await ProductRating.update(id, data);

    if (updatedProductRating.affected === 0) throw boom.notFound();

    return { message: "product rating updated" };
  }

  /**
   * Remove product rating from db
   * @async
   * @param id product rating id
   * @returns Promise
   */
  async delete(id: string) {
    const productRating = await this.findOne(id);

    await productRating.remove();

    return true;
  }
}

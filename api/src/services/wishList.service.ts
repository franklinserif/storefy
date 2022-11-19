/**
 * wishList service related to wishList crud operation
 * @module utils/wishList
 */

import { WishList } from "../db/entity/WishList";
import boom from "@hapi/boom";
import UserService from "./user.service";
import ProductService from "./product.service";

/**
 * user service for crud operations
 * @const
 */
const userService = new UserService();

/**
 * user service for crud operations
 * @const
 */
const productService = new ProductService();

export default class CategoryService {
  /**
   * Create a wishList
   * @async
   * @param userId
   * @returns Promise
   */
  async create(userId: string) {
    const user = await userService.findOne(userId);
    const wishList = WishList.create();

    await wishList.save();
    user.wishList = wishList;
    await user.save();

    return wishList;
  }

  /**
   * Find wishList
   * @async
   * @param {string} id
   * @returns {Promise<IWishList>}
   */
  async findOne(id: string) {
    const wishList = await WishList.findOneBy({ id });

    if (!wishList) throw boom.notFound();

    return wishList;
  }

  /**
   * add product to wishList
   * @async
   * @param productId
   * @param wishListId
   * @returns Promise
   */
  async addProduct(productId: string, wishListId: string) {
    const product = await productService.findOne(productId);
    const wishList = await this.findOne(wishListId);

    wishList.products.push(product);
    await wishList.save();

    return wishList;
  }

  /**
   * remove product to wishList
   * @async
   * @param productId
   * @param wishListId
   * @returns Promise
   */
  async removeProduct(productId: string, wishListId: string) {
    const product = await productService.findOne(productId);
    const wishList = await this.findOne(wishListId);

    wishList.products = wishList.products.filter(
      (item) => item.id != product.id
    );

    await wishList.save();

    return wishList;
  }

  /**
   * Remove wishList from db
   * @async
   * @param id wishList id
   * @returns Promise
   */
  async delete(id: string) {
    const wishList = await this.findOne(id);

    await wishList.remove();

    return true;
  }
}

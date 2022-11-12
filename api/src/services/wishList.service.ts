/**
 * wishList service related to wishList crud operation
 * @module utils/wishList
 */

import { WishList } from "../db/entity/WishList";
import { IWishList } from "../index.type";
import boom from "@hapi/boom";
import UserService from "./user.service";
import ProductService from "./product.service";

/**
 * user service for crud operations
 * @const
 * @type {UserService}
 */
const userService = new UserService();

/**
 * user service for crud operations
 * @const
 * @type {UserService}
 */
const productService = new ProductService();

export default class CategoryService {
  /**
   * Create a wishList
   * @async
   * @param {string} userId
   * @returns {Promise<ICategory>}
   */
  async create(userId: string) {
    const user = await userService.findOne(userId);
    const wishList = await WishList.create();

    user.wishList = wishList;
    user.save();

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
   * @param {string} productId
   * @param {string} wishListId
   * @returns {Promise<IWishList>}
   */
  async addProduct(productId: string, wishListId: string) {
    const product = await productService.findOne(productId);
    const wishList = await this.findOne(wishListId);

    wishList.products.push(product);
    wishList.save();

    return wishList;
  }

  /**
   * remove product to wishList
   * @async
   * @param {string} productId
   * @param {string} wishListId
   * @returns {Promise<IWishList>}
   */
  async removeProduct(productId: string, wishListId: string) {
    const product = await productService.findOne(productId);
    const wishList = await this.findOne(wishListId);

    wishList.products = wishList.products.filter(
      (item) => item.id != product.id
    );

    wishList.save();

    return wishList;
  }

  /**
   * Remove wishList from db
   * @async
   * @param {string} id wishList id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const wishList = await this.findOne(id);

    wishList.remove();

    return true;
  }
}

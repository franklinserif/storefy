/**
 * wishList service related to wishList crud operation
 * @module utils/wishList
 */

import { WishList } from "../db/entity/WishList.entity";
import boom from "@hapi/boom";
import ProductService from "./product.service";

/**
 * user service for crud operations
 * @const
 */
const productService = new ProductService();

export default class WishListService {
  /**
   * Find wishList
   * @async
   * @param id
   * @returns Promise
   */
  async findOne(id: string) {
    const wishList = await WishList.findOne({
      where: { id },
      relations: ["products"],
    });

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

    if (wishList.products.find((item) => item?.id === product?.id))
      throw boom.conflict("product is already added");

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

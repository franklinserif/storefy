/**
 * ShoppingCart service related to shopping cart crud operation
 * @module services/shoppingCart
 */

import { ShoppingCart } from "../db/entity/ShoppingCart.entity";
import { IShoppingCart } from "../index.type";
import boom from "@hapi/boom";

export default class ShoppingCartService {
  /**
   * Find all a shopping cart
   * @async
   * @returns Promise
   */
  async findAll() {
    const shoppingCarts = await ShoppingCart.find();

    return shoppingCarts;
  }

  /**
   * Find shopping cart by id
   * @async
   * @param id shopping cart id
   * @returns Promise
   */
  async findOne(id: string) {
    const shoppingCart = await ShoppingCart.findOne({
      where: { id },
      relations: ["shoppingCartItems", "shoppingCartItems.productModel"],
    });

    if (!shoppingCart) throw boom.notFound();

    return shoppingCart;
  }

  /**
   * Update shopping cart data
   * @async
   * @param id shopping cart id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IShoppingCart>) {
    const updatedShoppingCart = await ShoppingCart.save({
      id: id,
      total: data.total,
    });

    if (!updatedShoppingCart?.id) throw boom.notFound();

    return updatedShoppingCart;
  }

  /**
   * Remove Shopping cart from db
   * @async
   * @param id Shopping cart id
   * @returns Promise
   */
  async delete(id: string) {
    const shoppingCart = await this.findOne(id);

    await shoppingCart.remove();

    return true;
  }
}

/**
 * ShoppingCart service related to shopping cart crud operation
 * @module utils/shoppingCart
 */

import { ShoppingCart } from "../db/entity/ShoppingCart";
import { IShoppinCart } from "../index.type";
import boom from "@hapi/boom";

export default class CategoryService {
export default class ShoppingCartService {
  /**
   * Create a shopping cart
   * @async
   * @param {Omit<IShoppinCart, "id">}
   * @returns {Promise<IShoppinCart>}
   */
  async create(data: Omit<IShoppinCart, "id">) {
    const shoppingCart = await ShoppingCart.create(data);

    return shoppingCart;
  }

  /**
   * Find all a shopping cart
   * @async
   * @returns {Promise<IShoppinCart>}
   */
  async findAll() {
    const shoppingCart = await ShoppingCart.find();

    return shoppingCart;
  }

  /**
   * Find shopping cart by id
   * @async
   * @param {string} id shopping cart id
   * @returns {Promise<IShoppinCart>}
   */
  async findOne(id: string) {
    const shoppingCart = await ShoppingCart.findOneBy({ id });

    if (!shoppingCart) throw boom.notFound();

    return shoppingCart;
  }

  /**
   * Update shopping cart data
   * @async
   * @param {string} id shopping cart id
   * @param {Partial<IShoppinCart>} data to update
   * @returns {Promise<IShoppinCart>}
   */
  async update(id: string, data: Partial<IShoppinCart>) {
    const updatedShoppingCart = await ShoppingCart.update(id, data);

    if (!updatedShoppingCart) throw boom.notFound();

    return updatedShoppingCart;
  }

  /**
   * Remove Shopping cart from db
   * @async
   * @param {string} id Shopping cart id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const shoppingCart = await this.findOne(id);

    shoppingCart.remove();

    return true;
  }
}

/**
 * Shopping cart item service related to shopping cart item crud operation
 * @module utils/ShoppingCartItem
 */

import { ShoppingCartItem } from "../db/entity/ShoppingCartItem";
import { IShoppingCartItem } from "../index.type";
import boom from "@hapi/boom";

export default class ShoppingCartItemService {
  /**
   * Create a shopping cart item
   * @async
   * @param {Omit<IShoppingCartItem, "id">}
   * @returns {Promise<IShoppingCartItem>}
   */
  async create(data: Omit<IShoppingCartItem, "id">) {
    const shoppingCartItem = await ShoppingCartItem.create(data);

    return shoppingCartItem;
  }

  /**
   * Find all a shopping cart item
   * @async
   * @returns {Promise<IShoppingCartItem>}
   */
  async findAll() {
    const shoppingCartItem = await ShoppingCartItem.find();

    return shoppingCartItem;
  }

  /**
   * Find shopping cart item by id
   * @async
   * @param {string} id shopping cart item id
   * @returns {Promise<IShoppingCartItem>}
   */
  async findOne(id: string) {
    const shoppingCartItem = await ShoppingCartItem.findOneBy({ id });

    if (!shoppingCartItem) throw boom.notFound();

    return shoppingCartItem;
  }

  /**
   * Update shopping cart item data
   * @async
   * @param {string} id shopping cart item id
   * @param {Partial<IShoppingCartItem>} data to update
   * @returns {Promise<IShoppingCartItem>}
   */
  async update(id: string, data: Partial<IShoppingCartItem>) {
    const updatedShoppingCartItem = await ShoppingCartItem.update(id, data);

    if (!updatedShoppingCartItem) throw boom.notFound();

    return updatedShoppingCartItem;
  }

  /**
   * Remove shopping cart item from db
   * @async
   * @param {string} id shopping cart item id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const shoppingCartItem = await this.findOne(id);

    shoppingCartItem.remove();

    return true;
  }
}

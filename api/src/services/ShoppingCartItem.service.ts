/**
 * Shopping cart item service related to shopping cart item crud operation
 * @module utils/ShoppingCartItem
 */

import { ShoppingCartItem } from "../db/entity/ShoppingCartItem";
import { IShoppingCartItem } from "../index.type";
import boom from "@hapi/boom";
import ShoppingCartService from "./shoppingCart.service";
import ProductService from "./product.service";

/**
 * contains all related methods for product crud operation
 * @const
 * @type {ShopppingCartService}
 */
const productService = new ProductService();

/**
 * contains all related methods for shopping cart crud operation
 * @const
 * @type {ShopppingCartService}
 */
const shoppingCartService = new ShoppingCartService();

export default class ShoppingCartItemService {
  /**
   * Create a shopping cart item
   * @async
   * @param {string} productId
   * @param {string} shoppingCartId
   * @param {Omit<IShoppingCartItem, "id">}
   * @returns {Promise<IShoppingCartItem>}
   */
  async create(
    productId: string,
    shoppingCartId: string,
    data: Omit<IShoppingCartItem, "id" | "productId" | "shoppinCartId">
  ) {
    const product = await productService.findOne(productId);

    const shoppingCart = await shoppingCartService.findOne(shoppingCartId);

    const shoppingCartItem = await ShoppingCartItem.create();

    shoppingCartItem.qty = data.qty;

    product.shoppingCartItems.push(shoppingCartItem);
    product.save();

    shoppingCartItem.save();
    shoppingCart.shoppingCartItems.push(shoppingCartItem);
    shoppingCart.qty > 0 ? (shoppingCart.qty = +1) : (shoppingCart.qty = 1);
    shoppingCart.save();

    const prices = shoppingCart.shoppingCartItems.map((item) => item.price);

    shoppingCart.total = prices.reduce((prev, current) => prev + current, 0);

    shoppingCart.save();
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
   * @param {string} shoppingCartId
   * @param {string} shoppinCartItemId
   * @returns {Promise<boolean>}
   */
  async delete(shoppingCartId: string, shoppinCartItemId: string) {
    const shoppingCart = await shoppingCartService.findOne(shoppingCartId);
    const shoppingCartItem = await this.findOne(shoppinCartItemId);

    shoppingCart.shoppingCartItems = shoppingCart.shoppingCartItems.filter(
      (item) => item.id !== shoppingCartItem.id
    );
    shoppingCart.qty = shoppingCart.qty - 1;

    shoppingCartItem.remove();

    const prices = shoppingCart.shoppingCartItems.map((item) => item.price);

    shoppingCart.total = prices.reduce((prev, current) => prev + current, 0);

    shoppingCart.save();

    return true;
  }
}

/**
 * ShoppingCart service related to shopping cart crud operation
 * @module utils/shoppingCart
 */

import { ShoppingCart } from "../db/entity/ShoppingCart.entity";
import { IShoppingCart } from "../index.type";
import boom from "@hapi/boom";
import UserService from "./user.service";

/**
 * user service for crud operations related to users
 * @const
 */
const userService = new UserService();

export default class ShoppingCartService {
  /**
   * Create a shopping cart
   * @async
   * @param userId
   * @param data
   * @returns Promise
   */
  async create(userId: string, data: Omit<IShoppingCart, "id">) {
    const user = await userService.findOne(userId);
    const shoppingCart = ShoppingCart.create();

    shoppingCart.total = data.total;
    user.shoppingCarts.push(shoppingCart);

    await shoppingCart.save();
    await user.save();

    return shoppingCart;
  }

  /**
   * Find all a shopping cart
   * @async
   * @returns Promise
   */
  async findAll() {
    const shoppingCart = await ShoppingCart.find({
      relations: ["shoppingCartItems", "shoppingCartItems.productModel"],
    });

    return shoppingCart;
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
   * get shopping cart total price to paid
   * @param id
   * @returns Promise
   */
  async getTotal(id: string) {
    const shoppingCart = await this.findOne(id);

    const total = shoppingCart.shoppingCartItems
      .filter((item) => item?.productModel?.price !== undefined)
      .reduce((total, item) => total + item.productModel.price * item.qty, 0);

    shoppingCart.total = +total;

    const updatedShoppingCart = await shoppingCart.save();

    return updatedShoppingCart;
  }

  /**
   * Update shopping cart data
   * @async
   * @param id shopping cart id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IShoppingCart>) {
    const updatedShoppingCart = await ShoppingCart.update(id, data);

    if (updatedShoppingCart.affected === 0) throw boom.notFound();

    return { message: "shopping cart updated" };
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

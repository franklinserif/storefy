/**
 * Shopping cart item service related to shopping cart item crud operation
 * @module services/ShoppingCartItem
 */

import { ShoppingCartItem } from "../db/entity/ShoppingCartItem.entity";
import { IShoppingCartItem } from "../index.type";
import boom from "@hapi/boom";
import ShoppingCartService from "./shoppingCart.service";
import ProductModelService from "./productModel.service";

/**
 * contains all related methods for product crud operation
 * @const
 */
const productModelService = new ProductModelService();

/**
 * contains all related methods for shopping cart crud operation
 * @const
 */
const shoppingCartService = new ShoppingCartService();

export default class ShoppingCartItemService {
  /**
   * Create a shopping cart item
   * @async
   * @param productModelId
   * @param shoppingCartId
   * @param data
   * @returns Promise
   */
  async create(
    productModelId: string,
    shoppingCartId: string,
    data: Omit<IShoppingCartItem, "id" | "productId" | "shoppinCartId">
  ) {
    const productModel = await productModelService.findOne(productModelId);

    if (productModel.qty === 0) throw boom.conflict("sold out");

    const shoppingCart = await shoppingCartService.findOne(shoppingCartId);

    const itemFounded = shoppingCart.shoppingCartItems?.find(
      (item) => item?.productModel?.id === productModelId
    );

    let shoppingCartItem = {} as ShoppingCartItem;

    if (itemFounded?.id) {
      shoppingCartItem = itemFounded;
    } else {
      shoppingCartItem = ShoppingCartItem.create();
    }

    shoppingCartItem.qty = data.qty;

    if (!itemFounded?.id) {
      shoppingCartItem.productModel = productModel;
    }

    const newShoppingCartItem = await shoppingCartItem.save();

    if (!itemFounded?.id) {
      shoppingCart.shoppingCartItems.push(newShoppingCartItem);
    }

    const total = shoppingCart.shoppingCartItems
      .filter((item) => item?.productModel?.price !== undefined)
      .reduce((total, item) => total + item.productModel.price * item.qty, 0);

    shoppingCart.total = total;
    const newShoppingCart = await shoppingCart.save();

    return newShoppingCart;
  }

  /**
   * Find all a shopping cart item
   * @async
   * @returns Promise
   */
  async findAll() {
    const shoppingCartItem = await ShoppingCartItem.find();

    return shoppingCartItem;
  }

  /**
   * Find shopping cart item by id
   * @async
   * @param id shopping cart item id
   * @returns Promise
   */
  async findOne(id: string) {
    const shoppingCartItem = await ShoppingCartItem.findOne({
      where: { id },
      relations: ["productModel", "productModel.variations", "shoppingCart"],
    });

    if (!shoppingCartItem) throw boom.notFound();

    return shoppingCartItem;
  }

  /**
   * Update shopping cart item data
   * @async
   * @param id shopping cart item id
   * @param data to update
   * @returns Promise
   */
  async update(id: string, data: Partial<IShoppingCartItem>) {
    const shoppinCartItemUpdated = await ShoppingCartItem.update(id, data);

    if (shoppinCartItemUpdated.affected === 0) boom.notFound();

    return { message: "shopping cart item updated" };
  }

  /**
   * Remove shopping cart item from db
   * @async
   * @param shoppingCartId
   * @param shoppinCartItemId
   * @returns Promise
   */
  async delete(shoppinCartItemId: string) {
    const shoppinCartItem = await this.findOne(shoppinCartItemId);
    const shoppingCart = await shoppingCartService.findOne(
      shoppinCartItem.shoppingCart.id
    );

    shoppingCart.total -=
      shoppinCartItem.qty * shoppinCartItem.productModel.price;
    await shoppingCart.save();

    await shoppinCartItem.remove();

    return true;
  }
}

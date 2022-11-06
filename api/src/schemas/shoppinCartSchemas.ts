/**
 * ShoppingCart schemas for validate shoppinCart CRUD operation data
 * @module schemas/shoppinCartSchemas
 */

import joi from "joi";
import { IShoppingCart } from "../index.type";

/**
 * shoppingCart id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * shoppingcart id schema validation
 * @const
 * @type {joi.ObjectSchema<IShoppingCart>}
 */
export const shoppingCartSchema = joi.object<IShoppingCart>({
  id: id.required(),
});

/**
 * ShoppingCart schemas for validate shoppinCart CRUD operation data
 * @module schemas/shoppinCartSchemas
 */

import joi from "joi";
import { IShoppinCart } from "../index.type";

/**
 * shoppingCart id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * shoppingcart id schema validation
 * @const
 * @type {}
 */
export const shoppingCartSchema = joi.object<IShoppinCart>({
  id: id.required(),
});

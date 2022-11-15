/**
 * ShoppinCartItem schemas for validate ShoppinCartItem CRUD operation data
 * @module schemas/shoppinCartItemSchemas
 */

import joi from "joi";
import { IShoppingCartItem } from "../index.type";

/**
 * shoppinCartItem id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * product id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const productId = joi.string().uuid();

/**
 * shoppinCart id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const shoppingCartId = joi.string().uuid();

/**
 * shoppinCartItem qty quatity
 * @const
 * @type {joi.NumberSchema<number>}
 */
const qty = joi.number();

/**
 * shoppinCartItem creation validation schema
 * @const
 * @type {joi.ObjectSchema<IShoppingCartItem>}
 */
export const shoppinCartItemCreateSchema = joi.object<IShoppingCartItem>({
  qty: qty.required(),
  productId: productId.required(),
  shoppingCartId: shoppingCartId.required(),
});

/**
 * shoppingCartItem update date validation schema
 * @const
 * @type {joi.ObjectSchema<IShoppingCartItem>}
 */
export const shoppinCartItemUpdateSchema = joi.object<IShoppingCartItem>({
  qty,
});

/**
 * shoppingCartItem id schema validation
 * @const
 * @type {joi.ObjectSchema<IShoppingCartItem>}
 */
export const shoppinCartItemIdSchema = joi.object<IShoppingCartItem>({
  id: id.required(),
});

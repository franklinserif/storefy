/**
 * ShoppinCartItem schemas for validate ShoppinCartItem CRUD operation data
 * @module schemas/shoppinCartItemSchemas
 */

import joi from "joi";
import { IShoppingCartItem } from "../index.type";

/**
 * shoppinCartItem id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * product id uuid
 * @const
 */
const productId = joi.string().uuid();

/**
 * shoppinCart id uuid
 * @const
 */
const shoppingCartId = joi.string().uuid();

/**
 * shoppinCartItem qty quatity
 * @const
 */
const qty = joi.number();

/**
 * shoppinCartItem creation validation schema
 * @const
 */
export const shoppinCartItemCreateSchema = joi.object<IShoppingCartItem>({
  qty: qty.required(),
  productId: productId.required(),
  shoppingCartId: shoppingCartId.required(),
});

/**
 * shoppingCartItem update date validation schema
 * @const
 */
export const shoppinCartItemUpdateSchema = joi.object<IShoppingCartItem>({
  qty,
});

/**
 * shoppingCartItem id schema validation
 * @const
 */
export const shoppinCartItemIdSchema = joi.object<IShoppingCartItem>({
  id: id.required(),
});

/**
 * ShoppinCartItem schemas for validate ShoppinCartItem CRUD operation data
 * @module schemas/shoppinCartItemSchemas
 */

import joi from "joi";
import { IShoppinCartItem } from "../index.type";

/**
 * shoppinCartItem id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * shoppinCartItem qty quatity
 * @const
 * @type {joi.NumberSchema<number>}
 */
const qty = joi.number();

/**
 * shoppinCartItem creation validation schema
 * @const
 * @type {joi.ObjectSchema<IShoppinCartItem>}
 */
export const shoppinCartItemCreateSchema = joi.object<IShoppinCartItem>({
  qty: qty.required(),
});

/**
 * shoppingCartItem update date validation schema
 * @const
 * @type {joi.ObjectSchema<IShoppinCartItem>}
 */
export const shoppinCartItemUpdateSchema = joi.object<IShoppinCartItem>({
  qty,
});

/**
 * shoppingCartItem id schema validation
 * @const
 * @type {joi.ObjectSchema<IShoppinCartItem>}
 */
export const shoppinCartItemIdSchema = joi.object<IShoppinCartItem>({
  id: id.required(),
});

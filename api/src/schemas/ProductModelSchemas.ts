/**
 * Product model schemas for validate category CRUD operation data
 * @module schemas/productModelSchemas
 */

import joi from "joi";
import { IProductModel } from "../index.type";

/**
 * product model id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * product model quantity
 * @const
 */
const qty = joi.number();

/**
 * product model price
 * @const
 */
const price = joi.number();

/**
 * product model sizes
 * @const
 */
const sizes = joi.array().items(joi.string());

/**
 * product model colors
 * @const
 */
const colors = joi.array().items(joi.string());

/**
 * product model creation validation schema
 * @const
 */
export const productModelCreateSchema = joi.object<IProductModel>({});

/**
 * product model update data validation schema
 * @const
 */
export const productModelUpdateSchema = joi.object<IProductModel>({
  qty: qty.required(),
  price: price.required(),
  sizes: sizes.required(),
  colors: colors.required(),
});

/**
 * product model id validation schema
 * @const
 */
export const productModelIdSchema = joi.object<IProductModel>({
  qty,
  price,
  sizes,
  colors,
});

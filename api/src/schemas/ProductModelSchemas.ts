/**
 * Product model schemas for validate category CRUD operation data
 * @module schemas/productModelSchemas
 */

import joi from "joi";
import { variationCreateSchema } from "./variationSchemas";
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
 * variation
 * @const
 */
const variations = joi.array().items(variationCreateSchema);

/**
 * product model creation validation schema
 * @const
 */
export const productModelCreateSchema = joi.object<IProductModel>({
  qty: qty.required(),
  price: price.required(),
  variations: variations.required(),
});

/**
 * product model update data validation schema
 * @const
 */
export const productModelUpdateSchema = joi.object<IProductModel>({
  qty,
  price,
});

/**
 * product model id validation schema
 * @const
 */
export const productModelIdSchema = joi.object<IProductModel>({
  id,
});

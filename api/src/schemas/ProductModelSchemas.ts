/**
 * Product model schemas for validate category CRUD operation data
 * @module schemas/productModelSchemas
 */

import joi from "joi";
import { IProductModel, IProductModelCreate } from "../index.type";

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
 * variation options
 * @const
 */
const variationOptions = joi.array().items(joi.string());

/**
 * variation
 * @const
 */
const variation = joi.array().items(
  joi.object({
    name: joi.string(),
    values: variationOptions,
  })
);

/**
 * product model creation validation schema
 * @const
 */
export const productModelCreateSchema = joi.object<IProductModel>({
  qty: qty.required(),
  price: price.required(),
});

export const productModelFullCreateSchema = joi.object<IProductModelCreate>({
  productModel: productModelCreateSchema,
  variations: variation,
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

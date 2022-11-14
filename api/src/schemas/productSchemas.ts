/**
 * Product schemas for validate user crud operation data
 * @module schemas/productSchema
 */

import joi from "joi";
import { IProduct } from "../index.type";

/**
 * product id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * product name
 * @const
 * @type {joi.StringSchema<string>}
 */
const name = joi.string();

/**
 * product description
 * @const
 * @type {joi.StringSchema<string>}
 */
const description = joi.string();

/**
 * product price
 * @const
 * @type {joi.StringSchema<string>}
 */
const price = joi.number();

/**
 * product sizes
 * @const
 * @type {joi.ArraySchema<string[]>}
 */
const sizes = joi.array().items(joi.string());

/**
 * product colors
 * @const
 * @type {joi.ArraySchema<any[]>}
 */
const colors = joi.array().items(joi.string());

/**
 * product creation validatation schema
 * @const
 * @type {joi.ObjectSchema<IProduct>}
 */
export const productCreateSchema = joi.object<IProduct>({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  sizes: sizes.required(),
  colors: colors.required(),
});

/**
 * product update data validation schema
 * @const
 * @type {joi.ObjectSchema<IProduct>}
 */
export const productUpdateSchema = joi.object<IProduct>({
  name,
  description,
  price,
  sizes,
  colors,
});

/**
 * product id validation schema
 * @const
 * @type {joi.ObjectSchema<IProduct>}
 */
export const productIdSchema = joi.object<IProduct>({
  id: id.required(),
});

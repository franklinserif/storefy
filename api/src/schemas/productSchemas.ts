/**
 * Product schemas for validate user crud operation data
 * @module schemas/productSchema
 */

import joi from "joi";
import { IProduct } from "../index.type";

/**
 * product id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * product name
 * @const
 */
const name = joi.string();

/**
 * product description
 * @const
 */
const description = joi.string();

/**
 * product creation validatation schema
 * @const
 */
export const productCreateSchema = joi.object<IProduct>({
  name: name.required(),
  description: description.required(),
});

/**
 * product update data validation schema
 * @const
 */
export const productUpdateSchema = joi.object<IProduct>({
  name,
  description,
});

/**
 * product id validation schema
 * @const
 */
export const productIdSchema = joi.object<IProduct>({
  id: id.required(),
});

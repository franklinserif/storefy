/**
 * Product schemas for validate user crud operation data
 * @module schemas/productSchema
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { productModelCreateSchema } from "./ProductModelSchemas";
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
 * product model array of items
 * @const
 */
const productsModels = joi.array().items(productModelCreateSchema);

/**
 * product creation validatation schema
 * @const
 */
export const productCreateSchema = joi.object<IProduct>({
  name: name.required(),
  description: description.required(),
  productsModels: productsModels.required(),
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

/**
 * convert joi schemas in swagger valid schemas
 */
export const productCreateSchemaSwagger = j2s(productCreateSchema);
export const productUpdateSchemaSwagger = j2s(productUpdateSchema);
export const productIdSchemaSwagger = j2s(productIdSchema);

/**
 * Category schemas for validate user CRUD operation data
 * @module schemas/categorySchemas
 */

import joi from "joi";
import { ICategory } from "index.type";

/**
 * category id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * category name
 * @const
 * @type {joi.StringSchema<string>}
 */
const name = joi.string();

/**
 * category image
 * @const
 * @type {joi.StringSchema<string>}
 */
const image = joi.string();

/**
 * category creation validation schema
 * @const
 * @type {joi.ObjectSchema<ICategory>}
 */
export const categoryCreateSchema = joi.object<ICategory>({
  name: name.required(),
  image: image.required(),
});

/**
 * category update data validation schema
 * @const
 * @type {joi.ObjectSchema<ICategory>}
 */
export const categoryUpdateSchema = joi.object<ICategory>({
  name,
  image,
});

/**
 * category id validation schema
 * @const
 * @type {joi.ObjectSchema<ICategory>}
 */
export const categoryIdSchema = joi.object<ICategory>({
  id: id.required(),
});

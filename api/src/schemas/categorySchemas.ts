/**
 * Category schemas for validate category CRUD operation data
 * @module schemas/categorySchemas
 */

import joi from "joi";
import { ICategory, IAddOrRemoveCategoryParent } from "../index.type";

/**
 * category id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * category name
 * @const
 */
const name = joi.string();

/**
 * category image
 * @const
 */
const image = joi.string();

/**
 * category creation validation schema
 * @const
 */
export const categoryCreateSchema = joi.object<ICategory>({
  name: name.required(),
  image: image.required(),
});

/**
 * category update data validation schema
 * @const
 */
export const categoryUpdateSchema = joi.object<ICategory>({
  name,
  image,
});

/**
 * category id validation schema
 * @const
 */
export const categoryIdSchema = joi.object<ICategory>({
  id: id.required(),
});

/**
 * add or remove category as a child of another category
 * schema validator
 * @const
 */
export const addOrRemoveCategoryParent = joi.object<IAddOrRemoveCategoryParent>(
  {
    parentCategoryId: id.required(),
    childCategoryId: id.required(),
  }
);

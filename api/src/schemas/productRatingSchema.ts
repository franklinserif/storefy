/**
 * product rating schemas for validate user crud operation data
 * @module schemas/productRating
 */

import joi from "joi";
import { IProductRating } from "../index.type";

/**
 * product rating id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * product rating - rating
 * @const
 * @type {joi.StringSchema<string>}
 */
const rating = joi.number();

/**
 * product rating creation schema validation
 * @const
 * @type {joi.ObjectSchema<IProductRating>}
 */
export const productRatingCreateSchema = joi.object<IProductRating>({
  rating,
});

/**
 * product rating update data schema validation
 * @const
 * @type {joi.ObjectSchema<IProductRating>}
 */
export const productRatingDataSchema = joi.object<IProductRating>({
  rating,
});

/**
 * product rating id schema validation
 * @const
 * @type {joi.ObjectSchema<IProductRating>}
 */
export const productRatingIdSchema = joi.object<IProductRating>({
  id: id.required(),
});

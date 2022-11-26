/**
 * product rating schemas for validate user crud operation data
 * @module schemas/productRating
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IProductRating } from "../index.type";

/**
 * product rating id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * product rating - rating
 * @const
 */
const rating = joi.number();

/**
 * product id
 * @const
 */
const productId = joi.string().uuid();

/**
 * product id
 * @const
 */
const userId = joi.string().uuid();

/**
 * product rating creation schema validation
 * @const
 */
export const productRatingCreateSchema = joi.object<IProductRating>({
  productId: productId.required(),
  userId: userId.required(),
  rating: rating.required(),
});

/**
 * product rating update data schema validation
 * @const
 */
export const productRatingUpdateSchema = joi.object<IProductRating>({
  rating,
});

/**
 * product rating id schema validation
 * @const
 */
export const productRatingIdSchema = joi.object<IProductRating>({
  id: id.required(),
});

/**
 * convert joi schemas in swagger valid schemas
 */
export const productRatingCreateSchemaSwagger = j2s(productRatingCreateSchema);
export const productRatingUpdateSchemaSwagger = j2s(productRatingUpdateSchema);
export const productRatingIdSchemaSwagger = j2s(productRatingIdSchema);

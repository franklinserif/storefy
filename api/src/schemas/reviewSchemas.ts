/**
 * Review schemas for validate review CRUD operation data
 * @module schemas/reviewSchemas
 */

import joi from "joi";
import { IReview } from "../index.type";

/**
 * review id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * review comment
 * @const
 * @type {joi.StringSchema<string>}
 */
const comment = joi.string();

/**
 * review creation schema validation
 * @const
 * @type {joi.ObjectSchema<IReview>}
 */
export const reviewCreateSchema = joi.object<IReview>({
  comment: comment.required(),
});

/**
 * review update data schema validation
 * @const
 * @type {joi.ObjectSchema<IReview>}
 */
export const reviewUpdateSchema = joi.object<IReview>({
  comment,
});

/**
 * review id schema validation
 * @const
 * @type {joi.ObjectSchema<IReview>}
 */
export const reviewIdSchema = joi.object<IReview>({
  id,
});

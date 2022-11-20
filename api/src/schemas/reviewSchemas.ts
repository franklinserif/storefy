/**
 * Review schemas for validate review CRUD operation data
 * @module schemas/reviewSchemas
 */

import joi from "joi";
import { IReview } from "../index.type";

/**
 * review id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * review comment
 * @const
 */
const comments = joi.string();

/**
 * review creation schema validation
 * @const
 */
export const reviewCreateSchema = joi.object<IReview>({
  comments: comments.required(),
  userId: id.required(),
  productId: id.required(),
});

/**
 * review update data schema validation
 * @const
 */
export const reviewUpdateSchema = joi.object<IReview>({
  comments,
});

/**
 * review id schema validation
 * @const
 */
export const reviewIdSchema = joi.object<IReview>({
  id,
});

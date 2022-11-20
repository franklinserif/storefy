/**
 * Promotion schemas for validate user CRUD operation data
 * @module schemas/promotionSchemas
 */

import joi from "joi";
import { IPromotion } from "../index.type";

/**
 * promotion id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * promotion name
 * @const
 */
const name = joi.string();

/**
 * promotion description
 * @const
 */
const description = joi.string();

/**
 * promotion discount rate
 * @const
 */
const discountRate = joi.number();

/**
 * promotion start date
 * @const
 */
const startDate = joi.date();

/**
 * promotion end date
 * @const
 */
const endDate = joi.date();

/**
 * promotion creation schema validation
 * @const
 */
export const promotionCreateSchema = joi.object<IPromotion>({
  name: name.required(),
  description: description.required(),
  discountRate: discountRate.required(),
  startDate: startDate.required(),
  endDate: endDate.required(),
});

/**
 * promotion update data schema validation
 * @const
 */
export const promotionUpdateSchema = joi.object<IPromotion>({
  name,
  description,
  discountRate,
  startDate,
  endDate,
});

/**
 * promotion id schema validation
 * @const
 */
export const promotionIdSchema = joi.object<IPromotion>({
  id: id.required(),
});

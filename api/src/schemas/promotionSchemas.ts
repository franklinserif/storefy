/**
 * Promotion schemas for validate user CRUD operation data
 * @module schemas/promotionSchemas
 */

import joi from "joi";
import { IPromotion } from "../index.type";

/**
 * promotion id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * promotion name
 * @const
 * @type {joi.StringSchema<string>}
 */
const name = joi.string();

/**
 * promotion description
 * @const
 * @type {joi.StringSchema<string>}
 */
const description = joi.string();

/**
 * promotion discount rate
 * @const
 * @type {joi.NumberSchema<number>}
 */
const discountRate = joi.number();

/**
 * promotion start date
 * @const
 * @type {joi.DateSchema<Date>}
 */
const startDate = joi.date();

/**
 * promotion end date
 * @const
 * @type {joi.DateSchema<Date>}
 */
const endDate = joi.date();

/**
 * promotion creation schema validation
 * @const
 * @type {joi.ObjectSchema<IPromotion>}
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
 * @type {joi.ObjectSchema<IPromotion>}
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
 * @type {joi.ObjectSchema<IPromotion>}
 */
export const promotionIdSchema = joi.object<IPromotion>({
  id: id.required(),
});

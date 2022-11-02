/**
 * Variation option schemas for validate variation option CRUD operation data
 * @module schemas/variationOptionSchemas
 */

import joi from "joi";
import { IVariationOption } from "../index.type";

/**
 * variationOption id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * variationOption value
 * @const
 * @type {joi.StringSchema<string>}
 */
const value = joi.string();

/**
 * variationOption creation schema validation
 * @const
 * @type {joi.ObjectSchema<VariationOption>}
 */
export const variationOptionCreateSchema = joi.object<IVariationOption>({
  value: value.required(),
});

/**
 * variationOptions update schema validation
 * @const
 * @type {joi.ObjectSchema<VariationOption>}
 */
export const variationOptionUpdateSchema = joi.object<IVariationOption>({
  value,
});

/**
 * variationOption id schema validation
 * @const
 * @type {joi.ObjectSchema<VariationOption>}
 */
export const variationOptionIdSchema = joi.object<IVariationOption>({
  id: id.required(),
});

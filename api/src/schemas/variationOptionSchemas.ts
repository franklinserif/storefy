/**
 * Variation schemas for validate variation CRUD operation data
 * @module schemas/variationOptionSchemas
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IVariationOption } from "../index.type";

/**
 * variation option id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * variation option name
 * @const
 */
const value = joi.string();

/**
 * variation option creation validation schema
 * @const
 */
export const variationOptionCreateSchema = joi.object<IVariationOption>({
  value: value.required(),
});

/**
 * variation option update data validation schema
 * @const
 */
export const variationOptionUpdateSchema = joi.object<IVariationOption>({
  value,
});

/**
 * variation option id validation schema
 * @const
 */
export const variationOptionIdSchema = joi.object<IVariationOption>({
  id: id.required(),
});

export const variationOptionCreateSchemaSwagger = j2s(
  variationOptionCreateSchema
);
export const variationOptionUpdateSchemaSwagger = j2s(
  variationOptionUpdateSchema
);
export const variationOptionIdSchemaSwagger = j2s(variationOptionIdSchema);

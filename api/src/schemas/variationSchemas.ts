/**
 * Variation schemas for validate variation CRUD operation data
 * @module schemas/variationSchemas
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { variationOptionCreateSchema } from "./variationOptionSchemas";
import { IVariation } from "../index.type";

/**
 * variation id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * variation name
 * @const
 */
const name = joi.string();

/**
 * variation options list
 * @const
 */
const variationOptions = joi.array().items(variationOptionCreateSchema);

/**
 * variation creation validation schema
 * @const
 */
export const variationCreateSchema = joi.object<IVariation>({
  name: name.required(),
  variationOptions: variationOptions.required(),
});

/**
 * variation update data validation schema
 * @const
 */
export const variationUpdateSchema = joi.object<IVariation>({
  name,
});

/**
 * variation id validation schema
 * @const
 */
export const variationIdSchema = joi.object<IVariation>({
  id: id.required(),
});

/**
 * convert joi schema for swagger validation
 */
export const variationCreateSchemaSwagger = j2s(variationCreateSchema);
export const variationUpdateSchemaSwagger = j2s(variationUpdateSchema);
export const variationIdSchemaSwagger = j2s(variationIdSchema);

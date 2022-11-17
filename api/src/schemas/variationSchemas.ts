/**
 * Variation schemas for validate variation CRUD operation data
 * @module schemas/variationSchemas
 */

import joi from "joi";
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
 * variation creation validation schema
 * @const
 */
export const variationCreateSchema = joi.object<IVariation>({
  name: name.required(),
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

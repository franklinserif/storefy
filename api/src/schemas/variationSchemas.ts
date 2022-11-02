/**
 * Variation schemas for validate variation CRUD operation data
 * @module schemas/variationSchemas
 */

import joi from "joi";
import { IVariation } from "../index.type";

/**
 * variation id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * variation name
 * @const
 * @type {joi.StringSchema<string>}
 */
const name = joi.string();

/**
 * variation creation schema validation
 * @const
 * @type {joi.ObjectSchema<IVariation>}
 */
export const variatonCreateSchema = joi.object<IVariation>({
  name: name.required(),
});

/**
 * variation update schema validation
 * @const
 * @type {joi.ObjectSchema<IVariation>}
 */
export const variationUpdateSchema = joi.object<IVariation>({
  name,
});

/**
 * variation id schema validation
 * @const
 * @type {joi.ObjectSchema<IVariation>}
 */
export const variationIdSchema = joi.object<IVariation>({
  id: id.required(),
});

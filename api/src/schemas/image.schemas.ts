/**
 * Image schemas for validate image CRUD operation data
 * @module schemas/categorySchemas
 */
import joi from "joi";
import j2s from "joi-to-swagger";
import { IImage } from "../index.type";

/**
 * id schemas validtor for image's uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * image url validator for images
 * @const
 */
const imageUrl = joi.string().uri();

/**
 * size validator for images
 * @const
 */
const size = joi.number();

/**
 * validate image creation date
 * @const
 */
export const createImageSchema = joi.object<IImage>({
  imageUrl: imageUrl.required(),
  size: size.required(),
});

/**
 * validate data for update image information
 * @const
 */
export const updateImageSchema = joi.object<IImage>({
  imageUrl,
  size,
});

/**
 * validate id search schema
 * @const
 */
export const idImageSchema = joi.object<IImage>({
  id: id.required(),
});

/**
 * convert joi schemas to swagger schema
 */
export const createImageSchemaSwagger = j2s(createImageSchema);
export const updateImageSchemaSwagger = j2s(updateImageSchema);
export const idImageSchemaSwagger = j2s(idImageSchema);

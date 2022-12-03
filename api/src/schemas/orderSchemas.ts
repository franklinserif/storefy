/**
 * Order validation schmemas
 * @module schemas/orderSchemas
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IOrder } from "../index.type";

/**
 * uuid
 */
export const id = joi.string().uuid();

/**
 * total amount
 */
export const total = joi.number();

/**
 * order create validate data schemas
 */
export const orderCreateSchema = joi.object<IOrder>({
  total: total.required(),
});

/**
 * order update information
 */
export const orderUpdateSchema = joi.object<IOrder>({
  total,
});

/**
 * order id Schema validate
 */
export const orderIdSchema = joi.object<IOrder>({
  id: id.required(),
});

/**
 * joi schema convert to valid data
 */
export const orderCreateSchemaSwagger = j2s(orderCreateSchema);
export const orderUpdateSchemaSwagger = j2s(orderUpdateSchema);
export const orderIdSchemaSwagger = j2s(orderIdSchema);

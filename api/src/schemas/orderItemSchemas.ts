/**
 * order item schemas
 * @module schemas/orderItem
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IOrderItem } from "../index.type";

/**
 * uuid
 */
export const id = joi.string().uuid();

/**
 * name of the item
 */
export const name = joi.string();

/**
 * quantity
 */
export const qty = joi.number();

/**
 * total amount
 */
export const total = joi.number();

/**
 * price of the product
 */
export const price = joi.number();

/**
 * order create validate data schemas
 */
export const orderItemCreateSchema = joi.object<IOrderItem>({
  total: total.required(),
  qty: qty.required(),
  name: name.required(),
  price: price.required(),
});

/**
 * order update information
 */
export const orderItemUpdateSchema = joi.object<IOrderItem>({
  total,
  qty,
  name,
  price,
});

/**
 * order id Schema validate
 */
export const orderItemIdSchema = joi.object<IOrderItem>({
  id: id.required(),
});

/**
 * joi schema convert to swagger
 */
export const orderItemCreateSchemaSwagger = j2s(orderItemCreateSchema);
export const orderItemUpdateSchemaSwagger = j2s(orderItemUpdateSchema);
export const orderItemIdSchemaSwagger = j2s(orderItemIdSchema);

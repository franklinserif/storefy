/**
 * ShoppingCart schemas for validate shoppinCart CRUD operation data
 * @module schemas/shoppinCartSchemas
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IShoppingCart } from "../index.type";

/**
 * shoppingCart id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * shoppingCart id uuid
 * @const
 */
const total = joi.number();

/**
 * shoppingcart create schema validation
 * @const
 */
export const shoppingCartCreateSchema = joi.object<IShoppingCart>({
  total: total.required(),
});

/**
 * shoppingcart update schema validation
 * @const
 */
export const shoppingCartUpdateSchema = joi.object<IShoppingCart>({
  total,
});

/**
 * shoppingcart id schema validation
 * @const
 */
export const shoppingCartIdSchema = joi.object<IShoppingCart>({
  id: id.required(),
});

/**
 * convert joi to swagger valid schemas
 */
export const shoppingCartCreateSchemaSwagger = j2s(shoppingCartCreateSchema);
export const shoppingCartUpdateSchemaSwagger = j2s(shoppingCartUpdateSchema);
export const shoppingCartIdSchemaSwagger = j2s(shoppingCartIdSchema);

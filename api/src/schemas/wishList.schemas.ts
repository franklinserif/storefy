/**
 * wishList schemas for validate wishList CRUD operation data
 * @module schemas/categorySchemas
 */

import joi from "joi";
import { IWishList } from "../index.type";

/**
 * wishList id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * wishList id uuid
 * @const
 */
const wishListId = joi.string().uuid();

/**
 * product id uuid
 * @const
 */
const productId = joi.string().uuid();

/**
 * wishList id validation schema
 * @const
 */
export const addOrRemoveProductWishListSchema = joi.object<IWishList>({
  wishListId: wishListId.required(),
  productId: productId.required(),
});

/**
 * wishList id validation schema
 * @const
 */
export const wishListIdSchema = joi.object<{ id: string }>({
  id: id.required(),
});

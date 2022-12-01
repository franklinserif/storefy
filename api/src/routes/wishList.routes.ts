/**
 * wishList routes module
 * @module routes/wishList
 */

import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  addOrRemoveProductWishListSchema,
  wishListIdSchema,
} from "../schemas/wishList.schemas";

import {
  getWishListController,
  addProductController,
  removeProductController,
  wishListDeleteController,
} from "../controllers/wishList.controller";

import express from "express";

/**
 * Express route to mount wishList related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all wishLists route
 * @openapi
 * /wishlist/:id:
 *    get:
 *      tags:
 *        - wishlist
 *      summary: "get all wishLists"
 *      description: get all wishLists route
 *      responses:
 *        '200':
 *          description: response with a lit of wishList.
 *        '401':
 *          description: wishList not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(wishListIdSchema, "params"),
  getWishListController
);

/**
 * Serving add product to wishList
 * @openapi
 * /wishlist/add/product:
 *    patch:
 *      tags:
 *        - wishlist
 *      summary: "add product wishList"
 *      description: add a new wishList
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/addOrRemoveProductSchema"
 *      responses:
 *        '200':
 *          description: wishList .
 *        '401':
 *          description: wishList not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/add/product",
  validatorHandler(addOrRemoveProductWishListSchema, "body"),
  addProductController
);

/**
 * Serving add product to wishList
 * @openapi
 * /wishlist/remove/product:
 *    patch:
 *      tags:
 *        - wishlist
 *      summary: "remove product wishList"
 *      description: remove a wishList
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/addOrRemoveProductWishListSchema"
 *      responses:
 *        '200':
 *          description: wishList .
 *        '401':
 *          description: wishList not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/remove/product",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(addOrRemoveProductWishListSchema, "body"),
  removeProductController
);

/**
 * Serving wishList delete route
 * @openapi
 * /wishlist/:id:
 *    delete:
 *      tags:
 *        - wishlist
 *      summary: "wishList delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the wishList to delete
 *      description: delete wishList from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: wishList not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(wishListIdSchema, "params"),
  wishListDeleteController
);

export default router;

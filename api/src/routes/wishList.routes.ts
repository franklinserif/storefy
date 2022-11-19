/**
 * wishList routes module
 * @module routes/wishList
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  addOrRemoveProductWishListSchema,
  wishListIdSchema,
} from "../schemas/wishList.schemas";

import {
  getWishListController,
  createWishListServiceController,
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
 * /wishList/:
 *    get:
 *      tags:
 *        - wishLists
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
router.get("/", getWishListController);

/**
 * Serving get task by id
 * @openapi
 * /wishList/:id:
 *    get:
 *      tags:
 *        - wishList
 *      summary: "user id by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: user wishList owner
 *      description: create wishList
 *      responses:
 *        '200':
 *          description: create wish List.
 *        '401':
 *          description: wishList not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(wishListIdSchema, "params"),
  createWishListServiceController
);

/**
 * Serving add product to wishList
 * @openapi
 * /wishList/add/product:
 *    patch:
 *      tags:
 *        - wishList
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
router.patch(
  "/add/product",
  validatorHandler(addOrRemoveProductWishListSchema, "body"),
  addProductController
);

/**
 * Serving add product to wishList
 * @openapi
 * /wishList/remove/product:
 *    patch:
 *      tags:
 *        - wishList
 *      summary: "remove product wishList"
 *      description: remove a wishList
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
router.patch(
  "/remove/product",
  validatorHandler(addOrRemoveProductWishListSchema, "body"),
  removeProductController
);

/**
 * Serving wishList delete route
 * @openapi
 * /wishList/:id:
 *    delete:
 *      tags:
 *        - wishList
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
  validatorHandler(wishListIdSchema, "params"),
  wishListDeleteController
);

export default router;

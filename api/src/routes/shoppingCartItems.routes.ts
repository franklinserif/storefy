/**
 * shopping cart item routes module
 * @module routes/shoppingCartItem
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  shoppinCartItemCreateSchema,
  shoppinCartItemUpdateSchema,
  shoppinCartItemIdSchema,
} from "../schemas/shoppingCartItemSchemas";

import {
  getShoppingCartItemsController,
  getShoppingCartItemController,
  createShoppingCartItemController,
  shoppingCartItemUpdateController,
  shoppingCartItemDeleteController,
} from "../controllers/shoppingCartItem.controller";

import express from "express";

/**
 * Express route to mount shopping cart item related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving a list of shopping cart items route
 * @openapi
 * /shoppingcartitem/:
 *    get:
 *      tags:
 *        - shoppingCartsItems
 *      summary: "get all shoppingCartsItems"
 *      description: get all shoppingCartsItems route
 *      responses:
 *        '200':
 *          description: response with a lit of payment.
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getShoppingCartItemsController);

/**
 * Serving shopping cart item founded by id
 * @openapi
 * /payment/:id:
 *    get:
 *      tags:
 *        - payment
 *      summary: "get shopping cart item by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shopping cart item
 *      description: get shoppingCartItem by id
 *      responses:
 *        '200':
 *          description: get shoppingCartItem by id.
 *        '401':
 *          description: shoppingCartItem not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(shoppinCartItemIdSchema, "params"),
  getShoppingCartItemController
);

/**
 * Serving creation shopping cart item endpoint
 * @openapi
 * /shoppingcartitem:
 *    post:
 *      tags:
 *        - shoppingCartItem
 *      summary: "create a shoppingCartItem"
 *      description: create a new shoppingCartItem
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/shoppinCartItemCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the shoppingCartItem information .
 *        '401':
 *          description: shoppingCartItem not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  validatorHandler(shoppinCartItemCreateSchema, "body"),
  createShoppingCartItemController
);

/**
 * Serving shopping cart item update information route
 * @openapi
 * /shoppingCartItem/:id:
 *    patch:
 *      tags:
 *        - shoppingCartItem
 *      summary: "update shoppingCartItem"
 *      description: update shoppingCartItem information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCartItem to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/shoppinCartItemUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with shoppingCartItem information .
 *        '401':
 *          description: shoppingCartItem not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(shoppinCartItemIdSchema, "params"),
  validatorHandler(shoppinCartItemUpdateSchema, "body"),
  shoppingCartItemUpdateController
);

/**
 * Serving shopping cart item delete route
 * @openapi
 * /shoppingcaritem/:id:
 *    delete:
 *      tags:
 *        - shopping cart item
 *      summary: "shopping cart item delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shopping cart item to delete
 *      description: delete shoppingCartItem from db
 *      responses:
 *        '200':
 *          description: response with true.
 *        '401':
 *          description: shopping cart item not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(shoppinCartItemIdSchema, "params"),
  shoppingCartItemDeleteController
);

export default router;

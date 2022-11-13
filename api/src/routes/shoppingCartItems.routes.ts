/**
 * shoppingCartItem routes module
 * @module routes/shoppingCartItem
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  shoppinCartItemCreateSchema,
  shoppinCartItemUpdateSchema,
  shoppinCartItemIdSchema,
} from "../schemas/shoppingCartItemSchemas";

import { shoppingCartIdSchema } from "schemas/shoppinCartSchemas";

import {
  getShoppingCartItemsController,
  getShoppingCartItemController,
  createShoppingCartItemController,
  shoppingCartItemUpdateController,
  shoppingCartItemDeleteController,
} from "../controllers/shoppingCartItem.controller";

import express from "express";

/**
 * Express route to mount payment related endpoints
 * @const
 * @type {Router}
 */
const router = express.Router();

/**
 * Serving get all shoppingCartsItems route
 * @openapi
 * /shoppingCartItem/:
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
 * Serving get task by id
 * @openapi
 * /payment/:id:
 *    get:
 *      tags:
 *        - payment
 *      summary: "get payment by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCartItem
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
  "/",
  validatorHandler(shoppinCartItemIdSchema, "params"),
  getShoppingCartItemController
);

/**
 * Serving creation shoppingCartItem endpoint
 * @openapi
 * /shoppingCartItem:
 *    post:
 *      tags:
 *        - shoppingCartItem
 *      summary: "create a shoppingCartItem"
 *      description: create a new shoppingCartItem
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/shoppingCartItemCreateSchema"
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
 * Serving shoppingCartItem update information route
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
 *                $ref: "#/components/schemas/shoppingCartItemUpdateSchema"
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
 * Serving shoppingCartItem delete route
 * @openapi
 * /shoppingCartItem/:id:
 *    delete:
 *      tags:
 *        - shoppingCartItem
 *      summary: "shoppingCartItem delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCartItem to delete
 *      description: delete shoppingCartItem from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: shoppingCartItem not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(shoppinCartItemIdSchema, "params"),
  validatorHandler(shoppingCartIdSchema, "body"),
  shoppingCartItemDeleteController
);

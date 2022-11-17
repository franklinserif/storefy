/**
 * shoppingCart routes module
 * @module routes/shoppingCart
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  shoppingCartIdSchema,
  shoppingCartCreateSchema,
  shoppingCartUpdateSchema,
} from "../schemas/shoppingCartSchemas";

import {
  getShoppingCartsController,
  getShoppingCartController,
  createShoppingCartController,
  shoppingCartUpdateController,
  shoppingCartDeleteController,
} from "../controllers/shoppingCart.controller";

import express from "express";

/**
 * Express route to mount shoppingCart related endpoints
 * @const
 * @type {Router}
 */
const router = express.Router();

/**
 * Serving get all shoppingCarts route
 * @openapi
 * /shoppingCart:
 *    get:
 *      tags:
 *        - shoppingCarts
 *      summary: "get all shoppingCarts"
 *      description: get all shoppingCarts route
 *      responses:
 *        '200':
 *          description: response with a lit of shoppingCart.
 *        '401':
 *          description: shoppingCart not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getShoppingCartsController);

/**
 * Serving get shoppingCart by id
 * @openapi
 * /shoppingCart/:id:
 *    get:
 *      tags:
 *        - shoppingCart
 *      summary: "get shoppingCart by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCart
 *      description: get shoppingCart by id
 *      responses:
 *        '200':
 *          description: get shoppingCart by id.
 *        '401':
 *          description: shoppingCart not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(shoppingCartIdSchema, "params"),
  getShoppingCartController
);

/**
 * Serving creation shoppingCart endpoint
 * @openapi
 * /shoppingCart/:id:
 *    post:
 *      tags:
 *        - shoppingCart
 *      summary: "create a shoppingCart"
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user ownser
 *      description: create a new shoppingCart
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/shoppingCartCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the shoppingCart information .
 *        '401':
 *          description: shoppingCart not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  validatorHandler(shoppingCartIdSchema, "params"),
  validatorHandler(shoppingCartCreateSchema, "body"),
  createShoppingCartController
);

/**
 * Serving shoppingCart update information route
 * @openapi
 * /shoppingCart/:id:
 *    patch:
 *      tags:
 *        - shoppingCart
 *      summary: "update shoppingCart"
 *      description: update shoppingCart information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCart to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/shoppingCartUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with shoppingCart information .
 *        '401':
 *          description: shoppingCart not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(shoppingCartIdSchema, "params"),
  validatorHandler(shoppingCartUpdateSchema, "body"),
  shoppingCartUpdateController
);

/**
 * Serving shoppingCart delete route
 * @openapi
 * /shoppingCart/:id:
 *    delete:
 *      tags:
 *        - shoppingCart
 *      summary: "shoppingCart delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the shoppingCart to delete
 *      description: delete shoppingCart from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: shoppingCart not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(shoppingCartIdSchema, "params"),
  shoppingCartDeleteController
);

export default router;

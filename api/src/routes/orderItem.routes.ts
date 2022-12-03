/**
 * order item routes module
 * @module routes/orderItem
 */
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  orderItemCreateSchema,
  orderItemUpdateSchema,
  orderItemIdSchema,
} from "../schemas/orderItemSchemas";

import { orderIdSchema } from "../schemas/orderSchemas";

import {
  getOrderItemController,
  createOrderItemController,
  updateOrderItemController,
  orderItemDeleteController,
} from "../controllers/orderItem.controller";

import express from "express";

/**
 * Express route to mount order item related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving order item by id
 * @openapi
 * /orderitem/:id:
 *    get:
 *      tags:
 *        - orderitem
 *      summary: "get order item by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order item
 *      description: get order item by id
 *      responses:
 *        '200':
 *          description: get order item by id.
 *        '401':
 *          description: order item not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderItemIdSchema, "params"),
  getOrderItemController
);

/**
 * Serving creation order item endpoint
 * @openapi
 * /orderitem/:id:
 *    post:
 *      tags:
 *        - orderitem
 *      summary: "create a order item"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order
 *      description: create a new order item
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/orderItemCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the order item information .
 *        '401':
 *          description: order item not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderIdSchema, "params"),
  validatorHandler(orderItemCreateSchema, "body"),
  createOrderItemController
);

/**
 * Serving order item update route
 * @openapi
 * /orderitem/:id:
 *    patch:
 *      tags:
 *        - orderitem
 *      summary: "update order item"
 *      description: update order item route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order item to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/orderItemUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with order item information .
 *        '401':
 *          description: order item not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderItemIdSchema, "params"),
  validatorHandler(orderItemUpdateSchema, "body"),
  updateOrderItemController
);

/**
 * Serving order item delete route
 * @openapi
 * /orderItem:
 *    delete:
 *      tags:
 *        - orderitem
 *      summary: "order item delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order item to delete
 *      description: delete order item from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: order item not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderItemIdSchema, "params"),
  orderItemDeleteController
);

export default router;

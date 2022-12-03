/**
 * order routes module
 * @module routes/order
 */
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  orderCreateSchema,
  orderUpdateSchema,
  orderIdSchema,
} from "../schemas/orderSchemas";

import {
  getOrdersController,
  getOrderController,
  createOrderController,
  updateOrderController,
  orderDeleteController,
} from "../controllers/order.controller";

import express from "express";

/**
 * Express route to mount order related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all order route
 * @openapi
 * /product:
 *    get:
 *      tags:
 *        - order
 *      summary: "get all order"
 *      description: get all order route
 *      responses:
 *        '200':
 *          description: response with a lit of order.
 *        '401':
 *          description: order not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getOrdersController
);

/**
 * Serving order by id
 * @openapi
 * /order/:id:
 *    get:
 *      tags:
 *        - order
 *      summary: "get order by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order
 *      description: get order by id
 *      responses:
 *        '200':
 *          description: get order by id.
 *        '401':
 *          description: order not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderIdSchema, "params"),
  getOrderController
);

/**
 * Serving creation order endpoint
 * @openapi
 * /order/:id:
 *    post:
 *      tags:
 *        - order
 *      summary: "create a order"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order
 *      description: create a new order
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/orderCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the order information .
 *        '401':
 *          description: order not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderCreateSchema, "body"),
  createOrderController
);

/**
 * Serving order update route
 * @openapi
 * /order/:id:
 *    patch:
 *      tags:
 *        - order
 *      summary: "update order"
 *      description: update order route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/orderUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with order information .
 *        '401':
 *          description: order not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderIdSchema, "params"),
  validatorHandler(orderUpdateSchema, "body"),
  updateOrderController
);

/**
 * Serving order delete route
 * @openapi
 * /order:
 *    delete:
 *      tags:
 *        - order
 *      summary: "order delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the order to delete
 *      description: delete order from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: order not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(orderIdSchema, "params"),
  orderDeleteController
);

export default router;

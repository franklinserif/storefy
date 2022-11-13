/**
 * payment routes module
 * @module routes/payment
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  paymentCreateSchema,
  paymentUpdateSchema,
  paymentIdSchema,
} from "../schemas/paymentSchemas";

import { userIdSchema } from "../schemas/userSchemas";

import {
  getPaymentController,
  getPaymentsController,
  createPaymentController,
  paymentUpdateController,
  paymentDeleteController,
} from "../controllers/payment.controller";

import express from "express";

/**
 * Express route to mount payment related endpoints
 * @const
 * @type {Router}
 */
const router = express.Router();

/**
 * Serving get all payments route
 * @openapi
 * /payment/:
 *    get:
 *      tags:
 *        - payments
 *      summary: "get all payments"
 *      description: get all payments route
 *      responses:
 *        '200':
 *          description: response with a lit of payment.
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getPaymentsController);

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
 *          description: id of the payment
 *      description: get payment by id
 *      responses:
 *        '200':
 *          description: get payment by id.
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  validatorHandler(paymentIdSchema, "params"),
  getPaymentController
);

/**
 * Serving creation payment endpoint
 * @openapi
 * /payment:
 *    post:
 *      tags:
 *        - payment
 *      summary: "create a payment"
 *      description: create a new payment
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/paymentCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the payment information .
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  validatorHandler(userIdSchema, "params"),
  validatorHandler(paymentCreateSchema, "body"),
  createPaymentController
);

/**
 * Serving payment update information route
 * @openapi
 * /payment/:id:
 *    patch:
 *      tags:
 *        - payment
 *      summary: "update payment"
 *      description: update payment information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the payment to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/paymentUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with payment information .
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(paymentIdSchema, "params"),
  validatorHandler(paymentUpdateSchema, "body"),
  paymentUpdateController
);

/**
 * Serving payment delete route
 * @openapi
 * /payment/:id:
 *    delete:
 *      tags:
 *        - payment
 *      summary: "payment delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the payment to delete
 *      description: delete payment from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: payment not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(paymentIdSchema, "params"),
  paymentDeleteController
);

export default router;

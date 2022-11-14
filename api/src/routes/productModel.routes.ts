/**
 * payment routes module
 * @module routes/payment
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  productModelCreateSchema,
  productModelUpdateSchema,
  productModelIdSchema,
} from "../schemas/ProductModelSchemas";

import { productIdSchema } from "../schemas/productSchemas";

import {
  getProductsModelsController,
  getProductModelController,
  createProductModelController,
  productModelUpdateController,
  productModelDeleteController,
} from "../controllers/productModel.controller";

import express from "express";

/**
 * Express route to mount product model related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all product model route
 * @openapi
 * /productModel/:
 *    get:
 *      tags:
 *        - productModel
 *      summary: "get all productModel"
 *      description: get all product model route
 *      responses:
 *        '200':
 *          description: response with a lit of product model.
 *        '401':
 *          description: products models not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getProductsModelsController);

/**
 * Serving get product model by id
 * @openapi
 * /productmodel/:id:
 *    get:
 *      tags:
 *        - productModel
 *      summary: "get product model by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product model
 *      description: get product model by id
 *      responses:
 *        '200':
 *          description: get product model by id.
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(productModelIdSchema, "params"),
  getProductModelController
);

/**
 * Serving creation payment endpoint
 * @openapi
 * /productmodel:
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
  validatorHandler(productIdSchema, "params"),
  validatorHandler(productModelCreateSchema, "body"),
  createProductModelController
);

/**
 * Serving product model update information route
 * @openapi
 * /productmodel/:id:
 *    patch:
 *      tags:
 *        - productModel
 *      summary: "update product model"
 *      description: update product model information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product model to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/paymentUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with product model information .
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(productModelIdSchema, "params"),
  validatorHandler(productModelUpdateSchema, "body"),
  productModelUpdateController
);

/**
 * Serving product model delete route
 * @openapi
 * /productmodel/:id:
 *    delete:
 *      tags:
 *        - productmodel
 *      summary: "product model delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product model to delete
 *      description: delete product model from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(productModelIdSchema, "params"),
  productModelDeleteController
);

export default router;

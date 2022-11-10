/**
 * product routes module
 * @module routes/product
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  productCreateSchema,
  productUpdateSchema,
  productIdSchema,
} from "../schemas/productSchema";

import {
  getProductController,
  getProductsController,
  createProductController,
  updateProductController,
  productDeleteController,
} from "../controllers/product.controller";

import express from "express";

/**
 * Express route to mount product related endpoints
 * @const
 * @type {Router}
 */
const router = express.Router();

/**
 * Serving get all products route
 * @openapi
 * /product:
 *    get:
 *      tags:
 *        - products
 *      summary: "get all products"
 *      description: get all products route
 *      responses:
 *        '200':
 *          description: response with a lit of product.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getProductsController);

/**
 * Serving get task by id
 * @openapi
 * /product/:id:
 *    get:
 *      tags:
 *        - product
 *      summary: "get product by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product
 *      description: get product by id
 *      responses:
 *        '200':
 *          description: get product by id.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  validatorHandler(productIdSchema, "params"),
  getProductController
);

/**
 * Serving creation product endpoint
 * @openapi
 * /product:
 *    post:
 *      tags:
 *        - product
 *      summary: "create a product"
 *      description: create a new product
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the product information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  validatorHandler(productCreateSchema, "body"),
  createProductController
);

/**
 * Serving task update information route
 * @openapi
 * /product/:id:
 *    patch:
 *      tags:
 *        - product
 *      summary: "update product"
 *      description: update product information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with product information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(productIdSchema, "params"),
  validatorHandler(productUpdateSchema, "body"),
  updateProductController
);

/**
 * Serving product delete route
 * @openapi
 * /product:
 *    delete:
 *      tags:
 *        - product
 *      summary: "product delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product to delete
 *      description: delete product from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: product not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(productIdSchema, "params"),
  productDeleteController
);

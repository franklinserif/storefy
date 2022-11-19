/**
 * product routes module
 * @module routes/product
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  productCreateSchema,
  productUpdateSchema,
  productIdSchema,
} from "../schemas/productSchemas";

import { userIdSchema } from "../schemas/userSchemas";
import { categoryIdSchema } from "../schemas/categorySchemas";

import {
  getProductController,
  getProductsController,
  createProductController,
  updateProductController,
  productDeleteController,
  addCategoryToProductController,
} from "../controllers/product.controller";

import express from "express";

/**
 * Express route to mount product related endpoints
 * @const
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
 *          description: product not found or unauthorized.
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
 *          description: product not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
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
 *          description: product not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  validatorHandler(userIdSchema, "body"),
  validatorHandler(productCreateSchema, "body"),
  createProductController
);

/**
 * Serving product update information route
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
 *          description: product not found or unauthorized.
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

/**
 * Serving add product category information route
 * @openapi
 * /product/add/category:id:
 *    post:
 *      tags:
 *        - product
 *      summary: "add category to product"
 *      description: add category to product product information route
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
 *                $ref: "#/components/schemas/categoryIdchema"
 *      responses:
 *        '201':
 *          description: response with product information .
 *        '401':
 *          description: product not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/add/category/:id",
  validatorHandler(productIdSchema, "params"),
  validatorHandler(categoryIdSchema, "body"),
  addCategoryToProductController
);

/**
 * Serving remove product category information route
 * @openapi
 * /product/remove/category/:id:
 *    delete:
 *      tags:
 *        - product
 *      summary: "remove category to product"
 *      description: remove category to product product information route
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
 *                $ref: "#/components/schemas/categoryIdchema"
 *      responses:
 *        '201':
 *          description: response with product information .
 *        '401':
 *          description: product not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/remove/category/:id",
  validatorHandler(productIdSchema, "params"),
  validatorHandler(categoryIdSchema, "body"),
  addCategoryToProductController
);
export default router;

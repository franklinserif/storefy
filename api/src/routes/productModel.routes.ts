/**
 * payment routes module
 * @module routes/payment
 */

import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import uploadHandler from "../middlewares/uploadFile.handler";
import { validateImage } from "../middlewares/validator.handler";

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

import {
  addImageToProductModelController,
  imageDeleteController,
} from "../controllers/image.controller";

import express from "express";

/**
 * Express route to mount product model related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving list of product model route
 * @openapi
 * /productModel/:
 *    get:
 *      tags:
 *        - productmodel
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
 * Serving product model by id
 * @openapi
 * /productmodel/:id:
 *    get:
 *      tags:
 *        - productmodel
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
 * Serving creation product model endpoint
 * @openapi
 * /productmodel:
 *    post:
 *      tags:
 *        - productmodel
 *      summary: "create a payment"
 *      description: create a new product model
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productModelCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the new product model information .
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(productIdSchema, "params"),
  validatorHandler(productModelCreateSchema, "body"),
  createProductModelController
);

/**
 * Serving product model update route
 * @openapi
 * /productmodel/:id:
 *    patch:
 *      tags:
 *        - productmodel
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
 *                $ref: "#/components/schemas/productModelUpdateSchemaSwagger"
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  validatorHandler(productModelIdSchema, "params"),
  productModelDeleteController
);

/**
 * Serving add image to product model information route
 * @openapi
 * /productmodel/:id/add/image:
 *    post:
 *      tags:
 *        - productmodel
 *      summary: "add image to product model"
 *      description: add image to product model route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product model
 *      responses:
 *        '201':
 *          description: response with product model information .
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id/add/image",
  passport.authenticate("jwt", { session: false }),
  uploadHandler,
  validateImage,
  addImageToProductModelController
);

/**
 * Serving remove image from product model
 * @openapi
 * /productmodel/remove/image/:id:
 *    delete:
 *      tags:
 *        - productmodel
 *      summary: "remove image from product model"
 *      description: remove one image from product model
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product model to update
 *      responses:
 *        '201':
 *          description: response with product information .
 *        '401':
 *          description: product model not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/remove/image/:id",
  passport.authenticate("jwt", { session: false }),
  imageDeleteController
);

export default router;

/**
 * product rating routes module
 * @module routes/productRating
 */

import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  productRatingCreateSchema,
  productRatingUpdateSchema,
  productRatingIdSchema,
} from "../schemas/productRatingSchemas";

import {
  getProductsRatingsController,
  getProductRatingController,
  createProductRatingController,
  productRatingUpdateController,
  productRatingDeleteController,
} from "../controllers/productRating.controller";

import express from "express";

/**
 * Express route to mount product rating related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving a list of  products ratings route
 * @openapi
 * /productRating:
 *    get:
 *      tags:
 *        - productrating
 *      summary: "get all product ratings"
 *      description: get all product Ratings route
 *      responses:
 *        '200':
 *          description: response with a lit of product rating.
 *        '401':
 *          description: product rating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getProductsRatingsController);

/**
 * Serving a product rating founded by id
 * @openapi
 * /productRating/:id:
 *    get:
 *      tags:
 *        - productrating
 *      summary: "get product rating by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product rating
 *      description: get product rating by id
 *      responses:
 *        '200':
 *          description: get product rating by id.
 *        '401':
 *          description: productRating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(productRatingIdSchema, "params"),
  getProductRatingController
);

/**
 * Serving creation product rating endpoint
 * @openapi
 * /productRating:
 *    post:
 *      tags:
 *        - productrating
 *      summary: "create a product rating"
 *      description: create a new product rating
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productRatingCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the productRating information .
 *        '401':
 *          description: productRating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(productRatingCreateSchema, "body"),
  createProductRatingController
);

/**
 * Serving productRating update route
 * @openapi
 * /productRating/:id:
 *    patch:
 *      tags:
 *        - productrating
 *      summary: "update product rating"
 *      description: update product rating information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product rating to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productRatingUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with productRating information .
 *        '401':
 *          description: productRating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(productRatingIdSchema, "params"),
  validatorHandler(productRatingUpdateSchema, "body"),
  productRatingUpdateController
);

/**
 * Serving product rating delete route
 * @openapi
 * /productrating/:id:
 *    delete:
 *      tags:
 *        - productrating
 *      summary: "product rating delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the product rating to delete
 *      description: delete product rating from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: product rating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(productRatingIdSchema, "params"),
  productRatingDeleteController
);

export default router;

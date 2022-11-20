/**
 * productRating routes module
 * @module routes/productRating
 */

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
 * Express route to mount productRating related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all productsRatings route
 * @openapi
 * /productRating:
 *    get:
 *      tags:
 *        - productsRatings
 *      summary: "get all productsRatings"
 *      description: get all productsRatings route
 *      responses:
 *        '200':
 *          description: response with a lit of productRating.
 *        '401':
 *          description: productRating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getProductsRatingsController);

/**
 * Serving get task by id
 * @openapi
 * /productRating/:id:
 *    get:
 *      tags:
 *        - productRating
 *      summary: "get productRating by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the productRating
 *      description: get productRating by id
 *      responses:
 *        '200':
 *          description: get productRating by id.
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
 * Serving creation productRating endpoint
 * @openapi
 * /productRating:
 *    post:
 *      tags:
 *        - productRating
 *      summary: "create a productRating"
 *      description: create a new productRating
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productRatingCreateSchema"
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
  validatorHandler(productRatingCreateSchema, "body"),
  createProductRatingController
);

/**
 * Serving productRating update information route
 * @openapi
 * /productRating/:id:
 *    patch:
 *      tags:
 *        - productRating
 *      summary: "update productRating"
 *      description: update productRating information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the productRating to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/productRatingUpdateSchema"
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
  validatorHandler(productRatingIdSchema, "params"),
  validatorHandler(productRatingUpdateSchema, "body"),
  productRatingUpdateController
);

/**
 * Serving productRating delete route
 * @openapi
 * /productRating/:id:
 *    delete:
 *      tags:
 *        - productRating
 *      summary: "productRating delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the productRating to delete
 *      description: delete productRating from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: productRating not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(productRatingIdSchema, "params"),
  productRatingDeleteController
);

export default router;

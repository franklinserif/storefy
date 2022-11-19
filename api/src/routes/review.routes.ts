/**
 * review routes module
 * @module routes/review
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  reviewCreateSchema,
  reviewUpdateSchema,
  reviewIdSchema,
} from "../schemas/reviewSchemas";

import {
  getReviewsController,
  getReviewController,
  createReviewController,
  reviewUpdateController,
  reviewDeleteController,
} from "../controllers/review.controller";

import express from "express";

/**
 * Express route to mount review related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all productsRatings route
 * @openapi
 * /review/:
 *    get:
 *      tags:
 *        - productsRatings
 *      summary: "get all productsRatings"
 *      description: get all productsRatings route
 *      responses:
 *        '200':
 *          description: response with a lit of review.
 *        '401':
 *          description: review not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getReviewsController);

/**
 * Serving get review by id
 * @openapi
 * /review/:id:
 *    get:
 *      tags:
 *        - review
 *      summary: "get review by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the review
 *      description: get review by id
 *      responses:
 *        '200':
 *          description: get review by id.
 *        '401':
 *          description: review not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(reviewIdSchema, "params"),
  getReviewController
);

/**
 * Serving creation review endpoint
 * @openapi
 * /review:
 *    post:
 *      tags:
 *        - review
 *      summary: "create a review"
 *      description: create a new review
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/reviewCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the review information .
 *        '401':
 *          description: review not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  validatorHandler(reviewCreateSchema, "body"),
  createReviewController
);

/**
 * Serving review update information route
 * @openapi
 * /review/:id:
 *    patch:
 *      tags:
 *        - review
 *      summary: "update review"
 *      description: update review information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the review to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/reviewUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with review information .
 *        '401':
 *          description: review not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(reviewIdSchema, "params"),
  validatorHandler(reviewUpdateSchema, "body"),
  reviewUpdateController
);

/**
 * Serving review delete route
 * @openapi
 * /review/:id:
 *    delete:
 *      tags:
 *        - review
 *      summary: "review delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the review to delete
 *      description: delete review from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: review not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(reviewIdSchema, "params"),
  reviewDeleteController
);

export default router;

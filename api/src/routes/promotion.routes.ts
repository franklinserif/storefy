/**
 * promotion routes module
 * @module routes/promotion
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  promotionCreateSchema,
  promotionUpdateSchema,
  promotionIdSchema,
} from "../schemas/promotionSchemas";

import {
  getPromotionsController,
  getPromotionController,
  createPromotionController,
  promotionUpdateController,
  promotionDeleteController,
} from "../controllers/promotion.controller";

import express from "express";

/**
 * Express route to mount promotion related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all promotions route
 * @openapi
 * /promotion/:
 *    get:
 *      tags:
 *        - promotions
 *      summary: "get all promotions"
 *      description: get all promotions route
 *      responses:
 *        '200':
 *          description: response with a lit of promotion.
 *        '401':
 *          description: promotion not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getPromotionsController);

/**
 * Serving get promotion by id
 * @openapi
 * /promotion/:id:
 *    get:
 *      tags:
 *        - promotion
 *      summary: "get promotion by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the promotion
 *      description: get promotion by id
 *      responses:
 *        '200':
 *          description: get promotion by id.
 *        '401':
 *          description: promotion not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(promotionIdSchema, "params"),
  getPromotionController
);

/**
 * Serving creation promotion endpoint
 * @openapi
 * /promotion:
 *    post:
 *      tags:
 *        - promotion
 *      summary: "create a promotion"
 *      description: create a new promotion
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/promotionCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the promotion information .
 *        '401':
 *          description: promotion not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  validatorHandler(promotionCreateSchema, "body"),
  createPromotionController
);

/**
 * Serving promotion update information route
 * @openapi
 * /promotion/:id:
 *    patch:
 *      tags:
 *        - promotion
 *      summary: "update promotion"
 *      description: update promotion information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the promotion to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/promotionUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with promotion information .
 *        '401':
 *          description: promotion not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(promotionIdSchema, "params"),
  validatorHandler(promotionUpdateSchema, "body"),
  promotionUpdateController
);

/**
 * Serving promotion delete route
 * @openapi
 * /promotion/:id:
 *    delete:
 *      tags:
 *        - promotion
 *      summary: "promotion delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the promotion to delete
 *      description: delete promotion from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: promotion not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(promotionIdSchema, "params"),
  promotionDeleteController
);

export default router;

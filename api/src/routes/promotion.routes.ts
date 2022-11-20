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

import { categoryIdSchema } from "../schemas/categorySchemas";

import {
  getPromotionsController,
  getPromotionController,
  createPromotionController,
  promotionUpdateController,
  addCategoryToPromotionController,
  removeCategoryToPromotionController,
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
 * /promotion:
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
 * /promotion/:id:
 *    post:
 *      tags:
 *        - promotion
 *      summary: "create a promotion"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the category
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
  "/:id",
  validatorHandler(categoryIdSchema, "params"),
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
 * Serving add category to promotion route
 * @openapi
 * /promotion/add/category/:id:
 *    post:
 *      tags:
 *        - promotion
 *      summary: "add a category to promotion"
 *      description: update promotion information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the category to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/categoryIdSchema"
 *      responses:
 *        '201':
 *          description: response with promotion information .
 *        '401':
 *          description: promotion not found or unauthorized or category not found.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/add/category/:id",
  validatorHandler(categoryIdSchema, "params"),
  validatorHandler(promotionIdSchema, "body"),
  addCategoryToPromotionController
);

/**
 * Serving removecategory to promotion route
 * @openapi
 * /promotion/remove/category/:id:
 *    delete:
 *      tags:
 *        - promotion
 *      summary: "remove a category to promotion"
 *      description: update promotion information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the category to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/categoryIdSchema"
 *      responses:
 *        '201':
 *          description: response with promotion information .
 *        '401':
 *          description: promotion not found or unauthorized or category not found.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/remove/category/:id",
  validatorHandler(categoryIdSchema, "params"),
  validatorHandler(promotionIdSchema, "body"),
  removeCategoryToPromotionController
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

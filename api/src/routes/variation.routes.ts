/**
 * variation routes module
 * @module routes/variation
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  variationCreateSchema,
  variationUpdateSchema,
  variationIdSchema,
} from "../schemas/variationSchemas";

import { productModelIdSchema } from "../schemas/ProductModelSchemas";

import {
  getVariationsController,
  getVariationController,
  createVariationController,
  variationUpdateController,
  variationDeleteController,
} from "../controllers/variation.controller";

import express from "express";

/**
 * Express route to mount variation related endpoints
 * @const
 * @type {Router}
 */
const router = express.Router();

/**
 * Serving get all variations route
 * @openapi
 * /variation/:
 *    get:
 *      tags:
 *        - variations
 *      summary: "get all variations"
 *      description: get all variations route
 *      responses:
 *        '200':
 *          description: response with a lit of variation.
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getVariationsController);

/**
 * Serving get task by id
 * @openapi
 * /variation/:id:
 *    get:
 *      tags:
 *        - variation
 *      summary: "get variation by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the variation
 *      description: get variation by id
 *      responses:
 *        '200':
 *          description: get variation by id.
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(variationIdSchema, "params"),
  getVariationController
);

/**
 * Serving creation variation endpoint
 * @openapi
 * /variation:
 *    post:
 *      tags:
 *        - variation
 *      summary: "create a variation"
 *      description: create a new variation
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/variationCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the variation information .
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id",
  validatorHandler(productModelIdSchema, "params"),
  validatorHandler(variationCreateSchema, "body"),
  createVariationController
);

/**
 * Serving variation update information route
 * @openapi
 * /variation/:id:
 *    patch:
 *      tags:
 *        - variation
 *      summary: "update variation"
 *      description: update variation information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the variation to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/variationUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with variation information .
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(variationIdSchema, "params"),
  validatorHandler(variationUpdateSchema, "body"),
  variationUpdateController
);

/**
 * Serving variation delete route
 * @openapi
 * /variation/:id:
 *    delete:
 *      tags:
 *        - variation
 *      summary: "variation delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the variation to delete
 *      description: delete variation from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(variationIdSchema, "params"),
  variationDeleteController
);

export default router;

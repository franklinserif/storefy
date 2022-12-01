/**
 * variation routes module
 * @module routes/variation
 */

import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  variationOptionCreateSchema,
  variationOptionUpdateSchema,
  variationOptionIdSchema,
} from "../schemas/variationOptionSchemas";

import { variationIdSchema } from "../schemas/variationSchemas";

import {
  getVariationOptionsController,
  getVariationOptionController,
  createVariationOptionController,
  variationOptionUpdateController,
  variationOptionDeleteController,
} from "../controllers/variationOption.controller";

import express from "express";

/**
 * Express route to mount variation option related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving a list of  variations option route
 * @openapi
 * /variationoption:
 *    get:
 *      tags:
 *        - variationoption
 *      summary: "get all variation options"
 *      description: get all variation options route
 *      responses:
 *        '200':
 *          description: response with a lit of variation options.
 *        '401':
 *          description: variation not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getVariationOptionsController);

/**
 * Serving get task by id
 * @openapi
 * /variationoption/:id:
 *    get:
 *      tags:
 *        - variationoption
 *      summary: "get variation option by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the variation option
 *      description: get variation option by id
 *      responses:
 *        '200':
 *          description: get variation option by id.
 *        '401':
 *          description: variation option not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(variationOptionIdSchema, "params"),
  getVariationOptionController
);

/**
 * Serving creation variation option endpoint
 * @openapi
 * /variationoption:
 *    post:
 *      tags:
 *        - variationoption
 *      summary: "create a variation option"
 *      description: create a new variation option
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/variationOptionCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the variation option information .
 *        '401':
 *          description: variation option not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(variationOptionCreateSchema, "body"),
  createVariationOptionController
);

/**
 * Serving variation otpion update information route
 * @openapi
 * /variationoption:
 *    patch:
 *      tags:
 *        - variationoption
 *      summary: "update variation option"
 *      description: update variation option information route
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/variationOptionUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with variation option information .
 *        '401':
 *          description: variation option not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(variationOptionIdSchema, "params"),
  validatorHandler(variationOptionUpdateSchema, "body"),
  variationOptionUpdateController
);

/**
 * Serving variation option delete route
 * @openapi
 * /variationoption/:id:
 *    delete:
 *      tags:
 *        - variationoption
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
  passport.authenticate("jwt", { session: false }),
  validatorHandler(variationIdSchema, "params"),
  variationOptionDeleteController
);

export default router;

/**
 * user routes module
 * @module routes/user
 */

import validatorHandler from "../middlewares/validator.handler";

import { userUpdateSchema, userIdSchema } from "../schemas/userSchemas";

import {
  getUsersController,
  getUserProfileController,
  userUpdateController,
  userDeleteController,
} from "../controllers/user.controller";

import express from "express";

/**
 * Express route to mount user related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving a list of users route
 * @openapi
 * /user/:
 *    get:
 *      tags:
 *        - users
 *      summary: "get a list of users"
 *      description: get all users route
 *      responses:
 *        '200':
 *          description: response with a lit of user.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getUsersController);

/**
 * Serving user founded by id
 * @openapi
 * /user/:id:
 *    get:
 *      tags:
 *        - user
 *      summary: "get user by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user
 *      description: get user by id
 *      responses:
 *        '200':
 *          description: get user by id.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(userIdSchema, "params"),
  getUserProfileController
);

/**
 * Serving user update information route
 * @openapi
 * /user/:id:
 *    patch:
 *      tags:
 *        - user
 *      summary: "update user"
 *      description: update user information route
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with user information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  validatorHandler(userIdSchema, "params"),
  validatorHandler(userUpdateSchema, "body"),
  userUpdateController
);

/**
 * Serving user delete route
 * @openapi
 * /user/:id:
 *    delete:
 *      tags:
 *        - user
 *      summary: "user delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user to delete
 *      description: delete user from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  validatorHandler(userIdSchema, "params"),
  userDeleteController
);

export default router;

/**
 * This module contains all route for
 * Authentication
 * @module routes/auth
 * @requires express
 * @requires passport
 * @requires module:service/auth
 */

import express from "express";
import passport from "passport";
import {
  signinController,
  signupController,
  confirmCodeController,
  createConfirmationController,
  changePasswordController,
  refreshTokenController,
} from "../controllers/auth.controller";

import validatorHandler from "../middlewares/validator.handler";
import {
  userCreateSchema,
  userConfirmCodeSchema,
  userEmailSchema,
  userChangePasswordSchema,
} from "../schemas/userSchemas";
/**
 * Express router to mount auth related function on
 * @constant
 */
const router = express.Router();

/**
 * Serving signin route
 * @openapi
 * /auth/signin:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Signin"
 *      description: Signin auth user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userSigninSwagger"
 *      responses:
 *        '200':
 *          description: it will response with the access token and refresh token.
 *        '401':
 *          description: user not found or unauthorized.
 */
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signinController
);

/**
 * Serving refresh token
 * @openapi
 * /category/:
 *    get:
 *      tags:
 *        - auth
 *      summary: "get access token"
 *      description: get all categories route
 *      responses:
 *        '201':
 *          description: response with access token.
 *        '401':
 *          description: unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/refresh", refreshTokenController);

/**
 * Serving signup route
 * @openapi
 * /auth/signup:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Signup"
 *      description: register user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: it will response with the user information.
 *        '400':
 *          description: bad request, all field al required.
 */
router.post(
  "/signup",
  validatorHandler(userCreateSchema, "body"),
  signupController
);

/**
 * Serving confirmation code route
 * @openapi
 * /auth/confirm/code:
 *    post:
 *      tags:
 *        - auth
 *      summary: "code confirmation"
 *      description: verify if code is valid
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userConfirmCodeSchemaSwagger"
 *      responses:
 *        '200':
 *          description: return user information
 *        '401':
 *          description: unauthorized, invalid code/email.
 */
router.post(
  "/confirm/code",
  validatorHandler(userConfirmCodeSchema, "body"),
  confirmCodeController
);

/**
 * Serving forgot/password and new/code route
 * @openapi
 * /auth/forgot/password:
 *    post:
 *      tags:
 *        - auth
 *      summary: "forgot password / new code"
 *      description: User can request to change password if he forgot the password
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userEmailSchemaSwagger"
 *      responses:
 *        '200':
 *          description: it response with a message
 *        '401':
 *          description: unauthorized, invalid email.
 */
router.post(
  ["/new/code", "/forgot/password"],
  validatorHandler(userEmailSchema, "body"),
  createConfirmationController
);

/**
 * Serving change password route
 * @openapi
 * /auth/new/password:
 *    post:
 *      tags:
 *        - auth
 *      summary: "create new password"
 *      description: User change his password
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userChangePasswordSchemaSwagger"
 *      responses:
 *        '200':
 *          description: it response true
 *        '401':
 *          description: unauthorized, invalid email.
 */
router.post(
  "/new/password",
  validatorHandler(userChangePasswordSchema, "body"),
  changePasswordController
);

export default router;

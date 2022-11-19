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
 *                $ref: "#/components/schemas/signinUserSchema"
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
 * Serving signun route
 * @openapi
 * /auth/signup:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Signun"
 *      description: Signun auth user register
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/createUserSchema"
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
 * Serving code confirmation route
 * @openapi
 * /auth/confirm/code:
 *    post:
 *      tags:
 *        - auth
 *      summary: "code confirmation"
 *      description: code confirmation for verify user or user activation
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/confirmCodeSchema"
 *      responses:
 *        '200':
 *          description: it response with complete true
 *        '401':
 *          description: unauthorized, invalid code/email.
 */
router.post(
  "/confirm/code",
  validatorHandler(userConfirmCodeSchema, "body"),
  confirmCodeController
);

/**
 * Serving forgot forgot/password and new/code route
 * @openapi
 * /auth/forgot/password:
 *    post:
 *      tags:
 *        - auth
 *      summary: "forgot password"
 *      description: User can request to change password if he forgot the password he have
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/createCodeUserSchema"
 *      responses:
 *        '200':
 *          description: it response true
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
 *      description: User create a new password
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/changeUserPasswordSchema"
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

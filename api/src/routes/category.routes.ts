/**
 * category routes module
 * @module routes/category
 */
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";

import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdSchema,
  addOrRemoveCategoryParent,
} from "../schemas/categorySchemas";

import uploadHandler from "../middlewares/uploadFile.handler";
import { validateImage } from "../middlewares/validator.handler";

import {
  getCategoryController,
  getCategoriesController,
  createCategoryController,
  categoryUpdateController,
  categoryDeleteController,
  addParentCategoryController,
  removeParentCategoryController,
  addImageToCategoryController,
} from "../controllers/category.controller";

import express from "express";

/**
 * Express route to mount category related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving all categories route
 * @openapi
 * /category/:
 *    get:
 *      tags:
 *        - category
 *      summary: "get all categories"
 *      description: get all categories route
 *      responses:
 *        '200':
 *          description: response with a list of categories.
 *        '401':
 *          description: categories not found.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getCategoriesController);

/**
 * Serving a category founded by his id
 * @openapi
 * /category/:id:
 *    get:
 *      tags:
 *        - category
 *      summary: "get category by id "
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the category
 *      description: get category by id
 *      responses:
 *        '200':
 *          description: get category by id.
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  validatorHandler(categoryIdSchema, "params"),
  getCategoryController
);

/**
 * Serving creation category endpoint
 * @openapi
 * /category:
 *    post:
 *      tags:
 *        - category
 *      summary: "create a category"
 *      description: create a new category
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/categoryCreateSchemaSwagger"
 *      responses:
 *        '200':
 *          description: response with the category information.
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(categoryCreateSchema, "body"),
  createCategoryController
);

/**
 * Serving category update route
 * @openapi
 * /category/:id:
 *    patch:
 *      tags:
 *        - category
 *      summary: "update category"
 *      description: update category information route
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
 *                $ref: "#/components/schemas/categoryUpdateSchemaSwagger"
 *      responses:
 *        '201':
 *          description: response with message.
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(categoryIdSchema, "params"),
  validatorHandler(categoryUpdateSchema, "body"),
  categoryUpdateController
);

/**
 * Serving category delete route
 * @openapi
 * /category/:id:
 *    delete:
 *      tags:
 *        - category
 *      summary: "category delete route"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the category to delete
 *      description: delete category from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(categoryIdSchema, "params"),
  categoryDeleteController
);

/**
 * Serving add parent category
 * @openapi
 * /category/add/child:
 *    post:
 *      tags:
 *        - category
 *      summary: "add category decendent"
 *      description: add a category as a child of another category
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/addOrRemoveCategoryParentSwagger"
 *      responses:
 *        '200':
 *          description: response with the category information .
 *        '409':
 *          description: conflict category not already added to this parent.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/add/child",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(addOrRemoveCategoryParent, "body"),
  addParentCategoryController
);

/**
 * Serving remove parent category
 * @openapi
 * /category/remove/child:
 *    delete:
 *      tags:
 *        - category
 *      summary: "remove category decendent"
 *      description: remove a category as a child of another category
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/addOrRemoveCategoryParentSwagger"
 *      responses:
 *        '200':
 *          description: response with the category information .
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/remove/child",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(addOrRemoveCategoryParent, "body"),
  removeParentCategoryController
);

/**
 * Serving image category
 * @openapi
 * /category/:id/add/image:
 *    post:
 *      tags:
 *        - category
 *      summary: "add image category decendent"
 *      description: add image category
 *      responses:
 *        '200':
 *          description: response with the category information .
 *        '401':
 *          description: bad request
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/:id/add/image",
  passport.authenticate("jwt", { session: false }),
  uploadHandler,
  validateImage,
  addImageToCategoryController
);

export default router;

/**
 * category routes module
 * @module routes/category
 */

import validatorHandler from "../middlewares/validator.handler";

import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdSchema,
  addOrRemoveCategoryParent,
} from "../schemas/categorySchemas";

import {
  getCategoryController,
  getCategoriesController,
  createCategoryController,
  categoryUpdateController,
  categoryDeleteController,
  addParentCategoryController,
  removeParentCategoryController,
} from "../controllers/category.controller";

import express from "express";

/**
 * Express route to mount category related endpoints
 * @const
 */
const router = express.Router();

/**
 * Serving get all categories route
 * @openapi
 * /category/:
 *    get:
 *      tags:
 *        - categories
 *      summary: "get all categories"
 *      description: get all categories route
 *      responses:
 *        '200':
 *          description: response with a lit of category.
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get("/", getCategoriesController);

/**
 * Serving get task by id
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
 *                $ref: "#/components/schemas/categoryCreateSchema"
 *      responses:
 *        '200':
 *          description: response with the category information .
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  validatorHandler(categoryCreateSchema, "body"),
  createCategoryController
);

/**
 * Serving category update information route
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
 *                $ref: "#/components/schemas/categoryUpdateSchema"
 *      responses:
 *        '201':
 *          description: response with category information .
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
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
 *                $ref: "#/components/schemas/addOrRemoveCategorySchema"
 *      responses:
 *        '200':
 *          description: response with the category information .
 *        '401':
 *          description: category not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/add/child",
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
 *                $ref: "#/components/schemas/addOrRemoveCategorySchema"
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
  validatorHandler(addOrRemoveCategoryParent, "body"),
  removeParentCategoryController
);

export default router;

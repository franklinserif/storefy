/**
 * Category controllers for handler request
 * @module controllers/categoryControllers
 */

import { Request, Response, NextFunction } from "express";
import { ICategory } from "../index.type";
import CategoryService from "../services/category.service";

/**
 * category services for all crud operation in db
 * @const
 * @type {CategoryService}
 */
const categoryService = new CategoryService();

/**
 * get all category controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getCategoriesController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await categoryService.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

/**
 * get category controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const category = await categoryService.findOne(id);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

/**
 * category update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function categoryUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<ICategory> = req.body;
    const categoryUpdated = await categoryService.update(id, data);

    res.status(201).json(categoryUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete category controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function categoryDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await categoryService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

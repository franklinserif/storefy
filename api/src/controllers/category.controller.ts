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
 * @param _req
 * @param res
 * @param next
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
 * @param req
 * @param res
 * @param next
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
 * create category controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: Omit<ICategory, "id"> = req.body;
    const category = await categoryService.create(data);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

/**
 * category update controller
 * @async
 * @param req
 * @param res
 * @param next
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
 * @param req
 * @param res
 * @param next
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

/**
 * add a category as a children of another category
 * @param req
 * @param res
 * @param next
 */
export async function addParentCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { parentCategoryId, childCategoryId } = req.body;
    const parentCategory = await categoryService.addParentCategory(
      parentCategoryId,
      childCategoryId
    );

    res.status(201).json(parentCategory);
  } catch (error) {
    next(error);
  }
}

/**
 * add a category as a children of another category
 * @param req
 * @param res
 * @param next
 */
export async function removeParentCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { parentCategoryId, childCategoryId } = req.body;
    const parentCategory = await categoryService.removeParentCategory(
      parentCategoryId,
      childCategoryId
    );

    res.status(201).json(parentCategory);
  } catch (error) {
    next(error);
  }
}

/**
 * add image controller
 * @param req
 * @param res
 * @param next
 */
export async function addImageToCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const file = req.file;
    const category = await categoryService.addImage(
      id,
      file as Express.Multer.File
    );

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

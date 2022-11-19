/**
 * Product controllers for handler request
 * @module controllers/categoryControllers
 */

import { Request, Response, NextFunction } from "express";
import { IProduct } from "../index.type";
import ProductService from "../services/product.service";

/**
 * product services for all crud operation in db
 * @const
 */
const productService = new ProductService();

/**
 * create product controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.params;
    const data: Omit<IProduct, "id"> = req.body;
    const product = await productService.create(userId, data);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

/**
 * get all products controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getProductsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await productService.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

/**
 * get products controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

/**
 * product update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function updateProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IProduct> = req.body;
    const productUpdated = await productService.update(id, data);

    res.status(201).json(productUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete product controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function productDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await productService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * add category to product
 * @param req
 * @param res
 * @param next
 */
export async function addCategoryToProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { id: categoryId } = req.body;
    const rta = await productService.addCategory(id, categoryId);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * remove category from product
 * @param req
 * @param res
 * @param next
 */
export async function removeCategoryToProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { id: categoryId } = req.body;
    const rta = await productService.removeCategory(id, categoryId);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * Product model controllers for handler request
 * @module controllers/productModelControllers
 */

import { Request, Response, NextFunction } from "express";
import { IProductModel } from "../index.type";
import ProductModelService from "../services/productModel.service";

/**
 * product model service services for all crud operation in db
 * @const
 */
const productModelService = new ProductModelService();

/**
 * get all product model service  controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getProductsModelsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const producstModels = await productModelService.findAll();
    res.status(200).json(producstModels);
  } catch (error) {
    next(error);
  }
}

/**
 * get product model controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getProductModelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const productModel = await productModelService.findOne(id);

    res.status(200).json(productModel);
  } catch (error) {
    next(error);
  }
}

/**
 * create product model controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createProductModelController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = req.body;
    const productModel = await productModelService.create(id, data);

    res.status(200).json(productModel);
  } catch (error) {
    next(error);
  }
}

/**
 * payment update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function productModelUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IProductModel> = req.body;
    const productModelUpdated = await productModelService.update(id, data);

    res.status(201).json(productModelUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete product model updated controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function productModelDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await productModelService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

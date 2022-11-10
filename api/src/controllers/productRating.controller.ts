/**
 * product rating controllers for handler request
 * @module controllers/productRatingControllers
 */

import { Request, Response, NextFunction } from "express";
import { IProductRating } from "../index.type";
import ProductRatingService from "../services/productRating.service";

/**
 * product rating services for all crud operation in db
 * @const
 * @type {CategoryService}
 */
const productRatingService = new ProductRatingService();

/**
 * get all products ratings controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getProductsRatingsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productsRatings = await productRatingService.findAll();
    res.status(200).json(productsRatings);
  } catch (error) {
    next(error);
  }
}

/**
 * get poduct rating controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getProductRatingController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const productRating = await productRatingService.findOne(id);

    res.status(200).json(productRating);
  } catch (error) {
    next(error);
  }
}

/**
 * product rating update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function productRatingUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IProductRating> = req.body;
    const productRatingUpdated = await productRatingService.update(id, data);

    res.status(201).json(productRatingUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete product rating controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function productRatingDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await productRatingService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

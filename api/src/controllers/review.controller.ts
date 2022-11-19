/**
 * Review controllers for handler request
 * @module controllers/reviewControllers
 */

import { Request, Response, NextFunction } from "express";
import { IReview } from "../index.type";
import ReviewService from "../services/review.service";

/**
 * review services for all crud operation in db
 * @const
 */
const reviewService = new ReviewService();

/**
 * get all review controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getReviewsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviews = await reviewService.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

/**
 * get reviews controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const review = await reviewService.findOne(id);

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
}

/**
 * create promotion controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productId, userId, ...data } = req.body;
    const productRating = await reviewService.create(
      userId as unknown as string,
      productId as unknown as string,
      data as unknown as Omit<IReview, "id" | "productId" | "userId">
    );
    res.status(200).json(productRating);
  } catch (error) {
    next(error);
  }
}

/**
 * review update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function reviewUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IReview> = req.body;
    const reviewUpdated = await reviewService.update(id, data);

    res.status(201).json(reviewUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete review controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function reviewDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await reviewService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

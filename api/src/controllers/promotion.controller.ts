/**
 * Promotion controllers for handler request
 * @module controllers/promotionControllers
 */

import { Request, Response, NextFunction } from "express";
import { IPromotion } from "../index.type";
import PromotionService from "../services/promotion.service";

/**
 * promotion services for all crud operation in db
 * @const
 * @type {PromotionService}
 */
const promotionService = new PromotionService();

/**
 * get all promotions controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getPromotionsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const promotions = await promotionService.findAll();
    res.status(200).json(promotions);
  } catch (error) {
    next(error);
  }
}

/**
 * get promotion controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getPromotionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const promotion = await promotionService.findOne(id);

    res.status(200).json(promotion);
  } catch (error) {
    next(error);
  }
}

/**
 * create promotion controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createPromotionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params as unknown as string;
    const data: Omit<IPromotion, "id"> = req.body;
    const promotion = await promotionService.create(id, data);

    res.status(200).json(promotion);
  } catch (error) {
    next(error);
  }
}

/**
 * promotion update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function promotionUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IPromotion> = req.body;
    const promotionUpdated = await promotionService.update(id, data);

    res.status(201).json(promotionUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete promotion controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function promotionDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await promotionService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

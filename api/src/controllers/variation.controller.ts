/**
 * Variation controllers for handler request
 * @module controllers/variationControllers
 */

import { Request, Response, NextFunction } from "express";
import { IVariation } from "../index.type";
import VariationService from "../services/variation.service";

/**
 * Variation services for all crud operation in db
 * @const
 */
const variationService = new VariationService();

/**
 * get all variation controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getVariationsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const variations = await variationService.findAll();
    res.status(200).json(variations);
  } catch (error) {
    next(error);
  }
}

/**
 * get variation controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getVariationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const variation = await variationService.findOne(id);

    res.status(200).json(variation);
  } catch (error) {
    next(error);
  }
}

/**
 * create variation controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createVariationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Omit<IVariation, "id"> = req.body;
    const variation = await variationService.create(id, data);

    res.status(200).json(variation);
  } catch (error) {
    next(error);
  }
}

/**
 * variation update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function variationUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IVariation> = req.body;
    const paymentUpdated = await variationService.update(id, data);

    res.status(201).json(paymentUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete variation controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function variationDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await variationService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

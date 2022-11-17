/**
 * Variation option controllers for handler request
 * @module controllers/variationControllers
 */

import { Request, Response, NextFunction } from "express";
import { IVariationOption } from "../index.type";
import VariationOptionService from "../services/variationOption.service";

/**
 * Variation services for all crud operation in db
 * @const
 */
const variationOptionService = new VariationOptionService();

/**
 * get all variation options controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getVariationOptionsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const variationOptions = await variationOptionService.findAll();
    res.status(200).json(variationOptions);
  } catch (error) {
    next(error);
  }
}

/**
 * get variation options controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getVariationOptionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const variationOptions = await variationOptionService.findOne(id);

    res.status(200).json(variationOptions);
  } catch (error) {
    next(error);
  }
}

/**
 * create variation option controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createVariationOptionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Omit<IVariationOption, "id"> = req.body;
    const variationOption = await variationOptionService.create(id, data);

    res.status(200).json(variationOption);
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
export async function variationOptionUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IVariationOption> = req.body;
    const variationOptionUpdated = await variationOptionService.update(
      id,
      data
    );

    res.status(201).json(variationOptionUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete variation option controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function variationOptionDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await variationOptionService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

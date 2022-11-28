/**
 * Image controllers for handler request
 * @module controllers/imageControllers
 */

import { Request, Response, NextFunction } from "express";
import ImageService from "../services/image.service";

/**
 * Product services for all crud operation in db
 * @const
 */
const imageService = new ImageService();

/**
 * create category controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function addImageToProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const file = req.file;
    const image = await imageService.addImageToProduct(
      id,
      file as Express.Multer.File
    );

    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
}

/**
 * delete image controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function imageDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await imageService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

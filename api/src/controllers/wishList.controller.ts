/**
 * wishList controllers for handler request
 * @module controllers/wishListControllers
 */

import { Request, Response, NextFunction } from "express";
import { IWishList } from "../index.type";
import WishListService from "../services/wishList.service";

/**
 * wishList services for all crud operation in db
 * @const
 */
const wishListService = new WishListService();

/**
 * get wishList controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getWishListController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params as unknown as string;
    const wishList = await wishListService.findOne(id);

    res.status(200).json(wishList);
  } catch (error) {
    next(error);
  }
}

/**
 * create wishList controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createWishListServiceController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params as unknown as string;
    const wishList = await wishListService.create(userId);

    res.status(200).json(wishList);
  } catch (error) {
    next(error);
  }
}

/**
 * wishList add product controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function addProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productId, wishListId }: IWishList = req.body;
    const categoryUpdated = await wishListService.addProduct(
      productId,
      wishListId
    );

    res.status(201).json(categoryUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * wishList remove product controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function removeProductController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productId, wishListId }: IWishList = req.body;
    const categoryUpdated = await wishListService.removeProduct(
      productId,
      wishListId
    );

    res.status(201).json(categoryUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete wishList controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function wishListDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await wishListService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

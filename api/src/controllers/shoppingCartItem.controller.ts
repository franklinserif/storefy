/**
 * ShoppingCartItem controllers for handler request
 * @module controllers/shoppingCartItemControllers
 */

import { Request, Response, NextFunction } from "express";
import { IShoppingCartItem } from "../index.type";
import ShoppingCartItemService from "../services/ShoppingCartItem.service";

/**
 * shopping cart item services for all crud operation in db
 * @const
 */
const shoppingCartItemService = new ShoppingCartItemService();

/**
 * get all shopping cart item controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getShoppingCartItemsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingCartItems = await shoppingCartItemService.findAll();
    res.status(200).json(shoppingCartItems);
  } catch (error) {
    next(error);
  }
}

/**
 * get shopping cart item  controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getShoppingCartItemController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const shoppingCartItem = await shoppingCartItemService.findOne(id);

    res.status(200).json(shoppingCartItem);
  } catch (error) {
    next(error);
  }
}

/**
 * create shopping cart item controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createShoppingCartItemController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { productId, shoppingCartId, ...data } = req.body;
    const shoppinCartItem = await shoppingCartItemService.create(
      productId,
      shoppingCartId,
      data as unknown as Omit<
        IShoppingCartItem,
        "id" | "productId" | "shoppinCartId"
      >
    );

    res.status(200).json(shoppinCartItem);
  } catch (error) {
    next(error);
  }
}

/**
 * shopping Cart Item update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function shoppingCartItemUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IShoppingCartItem> = req.body;
    const shoppingCartItemUpdated = await shoppingCartItemService.update(
      id,
      data
    );

    res.status(201).json(shoppingCartItemUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete shopping cart item controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function shoppingCartItemDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await shoppingCartItemService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

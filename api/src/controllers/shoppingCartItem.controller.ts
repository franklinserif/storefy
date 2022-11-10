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
 * @type {CategoryService}
 */
const shoppingCartItemService = new ShoppingCartItemService();

/**
 * get all shopping cart item controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
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
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
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
 * shopping Cart Item update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
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
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function shoppingCartItemDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { shoppingCartId, shoppingCartItemId } = req.params;
    const rta = await shoppingCartItemService.delete(
      shoppingCartId,
      shoppingCartItemId
    );

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

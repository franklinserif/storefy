/**
 * shoppingCart controllers for handler request
 * @module controllers/shoppingCartControllers
 */

import { Request, Response, NextFunction } from "express";
import { IShoppingCart } from "../index.type";
import ShoppingCartService from "../services/shoppingCart.service";

/**
 * shoppingCart services for all crud operation in db
 * @const
 * @type {ShoppingCartService}
 */
const shoppingCartService = new ShoppingCartService();

/**
 * get all shopping carts controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getShoppingCartsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const shoppingCarts = await shoppingCartService.findAll();
    res.status(200).json(shoppingCarts);
  } catch (error) {
    next(error);
  }
}

/**
 * get shoppingCart controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getShoppingCartController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const shoppingCart = await shoppingCartService.findOne(id);

    res.status(200).json(shoppingCart);
  } catch (error) {
    next(error);
  }
}

/**
 * create shopping cart controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createShoppingCartController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: Omit<IShoppingCart, "id"> = req.body;
    const shoppingCart = await shoppingCartService.create(data);

    res.status(200).json(shoppingCart);
  } catch (error) {
    next(error);
  }
}

/**
 * shoppingCart update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function shoppingCartUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IShoppingCart> = req.body;
    const categoryUpdated = await shoppingCartService.update(id, data);

    res.status(201).json(categoryUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete shoppingCart controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function shoppingCartDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await shoppingCartService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

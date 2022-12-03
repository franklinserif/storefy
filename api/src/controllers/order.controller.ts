/**
 * Order controllers for handler request
 * @module controllers/orderControllers
 */

import { Request, Response, NextFunction } from "express";
import { IOrder, IPayload } from "../index.type";
import OrderService from "../services/order.service";

/**
 * order services for all crud operation in db
 * @const
 */
const orderService = new OrderService();

/**
 * create order controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as IPayload;
    const data = req.body;
    const order = await orderService.create(user.id, data);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

/**
 * get all order controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getOrdersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as IPayload;
    const products = await orderService.findAll(user.id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

/**
 * get order controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const order = await orderService.findOne(id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

/**
 * order update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function updateOrderController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IOrder> = req.body;
    const productUpdated = await orderService.update(id, data);

    res.status(201).json(productUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete order controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function orderDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await orderService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

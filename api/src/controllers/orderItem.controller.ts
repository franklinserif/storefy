/**
 * Order item controllers for handler request
 * @module controllers/orderControllers
 */

import { Request, Response, NextFunction } from "express";
import { IOrderItem } from "../index.type";
import OrderItemService from "../services/orderItem.service";

/**
 * Order item services for all crud operation in db
 * @const
 */
const orderItemService = new OrderItemService();

/**
 * create order item controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function createOrderItemController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: orderId } = req.params;
    const data = req.body;
    const orderItem = await orderItemService.create(orderId, data);

    res.status(200).json(orderItem);
  } catch (error) {
    next(error);
  }
}

/**
 * get order item controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getOrderItemController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const orderItem = await orderItemService.findOne(id);

    res.status(200).json(orderItem);
  } catch (error) {
    next(error);
  }
}

/**
 * order item update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function updateOrderItemController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IOrderItem> = req.body;
    const orderItemUpdated = await orderItemService.update(id, data);

    res.status(201).json(orderItemUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete order item controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function orderItemDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await orderItemService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * Payment controllers for handler request
 * @module controllers/categoryControllers
 */

import { Request, Response, NextFunction } from "express";
import { IPayment } from "../index.type";
import PaymentService from "../services/payment.service";

/**
 * payment services for all crud operation in db
 * @const
 */
const paymentService = new PaymentService();

/**
 * get all payments controller
 * @async
 * @param _req
 * @param res
 * @param next
 */
export async function getPaymentsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payments = await paymentService.findAll();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
}

/**
 * get payment controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function getPaymentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const payment = await paymentService.findOne(id);

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
}

/**
 * payment update controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function paymentUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IPayment> = req.body;
    const paymentUpdated = await paymentService.update(id, data);

    res.status(201).json(paymentUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete payment controller
 * @async
 * @param req
 * @param res
 * @param next
 */
export async function paymentDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await paymentService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

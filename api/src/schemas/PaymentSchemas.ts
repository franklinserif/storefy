/**
 * Payment schemas for validate user CRUD operation data
 * @module schemas/paymentType
 */

import joi from "joi";
import { IPayment } from "index.type";

/**
 * payment id uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string().uuid();

/**
 * payment provider
 * @const
 * @type {joi.StringSchema<string>}
 */
const provider = joi.string();

/**
 * payment account number
 * @const
 * @type {joi.StringSchema<string>}
 */
const accountNumber = joi.number();

/**
 * payment expiry date
 * @const
 * @type {joi.DateSchema<Date>}
 */
const expiryDate = joi.date();

/**
 * payment type
 * @const
 * @type {joi.DateSchema<string>}
 */
const paymentType = joi.string().valid("payment");

/**
 * payment creation validatation schema
 * @const
 * @type {joi.ObjectSchema<IPayment>}
 */
export const paymentCreateSchema = joi.object<IPayment>({
  provider: provider.required(),
  accountNumber: accountNumber.required(),
  expiryDate: expiryDate.required(),
  paymentType: paymentType.required(),
});

/**
 * payment update data validation schema
 * @const
 * @type {joi.ObjectSchema<IPayment>}
 */
export const paymentUpdateSchema = joi.object<IPayment>({
  provider,
  accountNumber,
  expiryDate,
  paymentType,
});

/**
 * payment id validation schema
 * @const
 * @type {joi.ObjectSchema<IPayment>}
 */
export const paymentIdSchema = joi.object<IPayment>({
  id: id.required(),
});

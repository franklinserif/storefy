/**
 * Payment schemas for validate user CRUD operation data
 * @module schemas/paymentType
 */

import joi from "joi";
import j2s from "joi-to-swagger";
import { IPayment } from "../index.type";

/**
 * payment id uuid
 * @const
 */
const id = joi.string().uuid();

/**
 * payment provider
 * @const
 */
const provider = joi.string();

/**
 * payment account number
 * @const
 */
const accountNumber = joi.number();

/**
 * payment expiry date
 * @const
 */
const expiryDate = joi.date();

/**
 * payment type
 * @const
 */
const paymentType = joi.string();

/**
 * payment creation validatation schema
 * @const
 */
export const paymentCreateSchema = joi.object<IPayment>({
  provider,
  accountNumber,
  expiryDate,
  paymentType,
});

/**
 * payment update data validation schema
 * @const
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
 */
export const paymentIdSchema = joi.object<IPayment>({
  id: id.required(),
});

/**
 * convert joi to swagger schemas validation
 */
export const paymentCreateSchemaSwagger = j2s(paymentCreateSchema);
export const paymentUpdateSchemaSwagger = j2s(paymentUpdateSchema);
export const paymentIdSchemaSwagger = j2s(paymentIdSchema);

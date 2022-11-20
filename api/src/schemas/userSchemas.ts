/**
 * User schemas for validate user crud operation data
 * @module schemas/userSchema
 */

import joi from "joi";
import { IUser, IChangeUserPassword, IConfirmCode } from "../index.type";

/**
 * user id - uuid
 * @const
 */
const id = joi.string();

/**
 * user first name
 * @const
 */
const firstName = joi.string().min(2).max(15);

/**
 * user last name
 * @const
 */
const lastName = joi.string().min(3).max(15);

/**
 * user email adddress
 * @const
 */
const email = joi.string().email();

/**
 * user phone number
 * @const
 */
const phoneNumber = joi.string();

/**
 * user password
 * @const
 */
const password = joi
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .messages({
    "string.pattern.base":
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
  });

/**
 * user roles
 * @const
 */
const roles = joi.string().valid("seller", "client");

/**
 * user's street number
 * @const
 * @type {joi.NumberSchema<number>}
 */
const streetNumber = joi.number();

/**
 * user default address
 * @const
 */
const addressLine1 = joi.string();

/**
 * user second address
 * @const
 */
const addressLine2 = joi.string();

/**
 * user's city
 * @const
 */
const city = joi.string();

/**
 * user's region
 * @const
 */
const region = joi.string();

/**
 * user's postal code
 * @const
 */
const postalCode = joi.string();

/**
 * user confirm code
 * @const
 */
const code = joi.number();

/**
 * user create schema validation
 * @const
 * @type {joi.ObjectSchema<IUser>}
 */
export const userCreateSchema = joi.object<IUser>({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  roles: roles.required(),
  streetNumber,
  addressLine1,
  addressLine2,
  phoneNumber,
  city: city.required(),
  region: region.required(),
  postalCode,
});

/**
 * user update data schema validation
 * @const
 */
export const userUpdateSchema = joi.object<IUser>({
  firstName,
  lastName,
  email,
  password,
  roles,
  phoneNumber,
  streetNumber,
  addressLine1,
  addressLine2,
  city,
  region,
  postalCode,
});

/**
 * user id schema validation
 * @const
 */
export const userIdSchema = joi.object<IUser>({
  id,
});

/**
 * user email schema validation
 * @const
 */
export const userEmailSchema = joi.object<{ email: string }>({
  email: email.required(),
});

/**
 * user confirm code schema validation
 * @const
 */
export const userConfirmCodeSchema = joi.object<IConfirmCode>({
  email: email.required(),
  code: code.required(),
});

/**
 * user change password schema validation
 * @const
 */
export const userChangePasswordSchema = joi.object<IChangeUserPassword>({
  email: email.required(),
  code: code.required(),
  password: password.required(),
});

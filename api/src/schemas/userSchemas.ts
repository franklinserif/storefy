/**
 * User schemas for validate user crud operation data
 * @module schemas/userSchema
 */

import joi from "joi";
import { IUser, IChangeUserPassword, IConfirmCode } from "index.type";

/**
 * user id - uuid
 * @const
 * @type {joi.StringSchema<string>}
 */
const id = joi.string();

/**
 * user first name
 * @const
 * @type {joi.StringSchema<string>}
 */
const firstName = joi.string().min(2).max(15);

/**
 * user last name
 * @const
 * @type {joi.StringSchema<string>}
 */
const lastName = joi.string().min(3).max(15);

/**
 * user email adddress
 * @const
 * @type {joi.StringSchema<string>}
 */
const email = joi.string().email();

/**
 * user phone number
 * @const
 * @type {joi.StringSchema<string>}
 */
const phoneNumber = joi
  .string()
  .regex(/^[0-9]{10}$/)
  .messages({ "string.pattern.base": "Phone number must have 10 digits" });

/**
 * user password
 * @const
 * @type {joi.StringSchema<string>}
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
 * @type {joi.StringSchema<string>}
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
 * @type {joi.StringSchema<string>}
 */
const addressLine1 = joi.string();

/**
 * user second address
 * @const
 * @type {joi.StringSchema<string>}
 */
const addressLine2 = joi.string();

/**
 * user's city
 * @const
 * @type {joi.StringSchema<string>}
 */
const city = joi.string();

/**
 * user's region
 * @const
 * @type {joi.StringSchema<string>}
 */
const region = joi.string();

/**
 * user's postal code
 * @const
 * @type {joi.StringSchema<string>}
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
  streetNumber: streetNumber.required(),
  addressLine1: addressLine1.required(),
  addressLine2: addressLine2.required(),
  phoneNumber: phoneNumber.required(),
  city: city.required(),
  region: region.required(),
  postalCode: postalCode.required(),
});

/**
 * user update data schema validation
 * @const
 * @type {joi.ObjectSchema<IUser>}
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
 * @type {joi.ObjectSchema<IUser>}
 */
export const userIdSchema = joi.object<IUser>({
  id,
});

/**
 * user email schema validation
 * @const
 * @type {joi.ObjectSchema<{email: string;}>}
 */
export const userEmailSchema = joi.object<{ email: string }>({
  email: email.required(),
});

/**
 * user confirm code schema validation
 * @const
 * @type {joi.ObjectSchema<IConfirmCode>}
 */
export const userConfirmCodeSchema = joi.object<IConfirmCode>({
  email: email.required(),
  code: code.required(),
});

/**
 * user change password schema validation
 * @const
 * @type {joi.ObjectSchema<IChangeUserPassword>}
 */
export const userChangePasswordSchema = joi.object<IChangeUserPassword>({
  email: email.required(),
  code: code.required(),
  password: password.required(),
});

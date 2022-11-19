/**
 * validate request data with joi
 * @module middlewares/validatorHandler
 */

import { TSchemas, TProperty } from "../index.type";
import { Response, Request, NextFunction } from "express";
import boom from "@hapi/boom";

/**
 * validate request data with joi
 * @param schema joi schema
 * @param property body or params
 * @returns Function
 */
export default function validatorHandler(
  schema: TSchemas,
  property: TProperty
) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = req[property];

    /**
     * abortEarly show all errors instead of show 1 error
     */
    const { error } = schema.validate(data, { abortEarly: true });

    if (error) {
      next(boom.badRequest(error.message));
    } else {
      next();
    }
  };
}

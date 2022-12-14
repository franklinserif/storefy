/**
 * errors catch middlewares
 * @module middlewares/errorHandler
 */

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Boom } from "@hapi/boom";
import { TypeORMError } from "typeorm";

/**
 * handler all boom error if it's a boom error
 * otherwise it will response with the error it self
 * @param error
 * @param _req
 * @param res
 * @param _next
 * @returns void
 */
export const boomErrorHandler: ErrorRequestHandler = (
  error: Boom,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * It handle all typeorm error
 * @param err
 * @param _req
 * @param res
 * @param next
 */
export const ormErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof TypeORMError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      stack: err.stack,
    });
  } else {
    next(err);
  }
};

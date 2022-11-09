/**
 * user controllers for handler request
 * @module controllers/userControllers
 */

import { Request, Response, NextFunction } from "express";
import { IUser } from "../index.type";
import UserService from "../services/user.service";

/**
 * user services for all crud operation in db
 * @const
 * @type {UserService}
 */
const userService = new UserService();

/**
 * get all user controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUsersController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * get user profile controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUserProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * user update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function userUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IUser> = req.body;
    const userUpdated = await userService.update(id, data);

    res.status(201).json(userUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * delete user controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function userDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rta = await userService.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

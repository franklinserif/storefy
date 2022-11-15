/**
 * authentication controllers
 * @module controllers/authenticationControllers
 */
import { Request, Response, NextFunction } from "express";
import { IUser } from "index.type";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

/**
 * auth service for crud operations in db
 * @const
 * @type {AuthService}
 */
const authService = new AuthService();

/**
 * user sevice for crud operations in db
 * @const
 * @type {UserService}
 */
const userService = new UserService();

/**
 * handle all signin request
 * @async
 * @param {Request} req
 * @param {Response } res
 * @param {NextFunction} next
 */
export async function signinController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;
    const tokens = await authService.signTokens(user as IUser);

    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
}

/**
 * handle all signup/register user request
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const user = await authService.create(data);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * user confirm code controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function confirmCodeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, confirmCode } = req.body;
    const rta = await authService.confirmCode(
      email as string,
      confirmCode as number
    );

    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * create confirmation code controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createConfirmationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    const rta = await authService.createCode(email as string);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * user change password controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function changePasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, code } = req.body;
    const rta = await authService.changeUserPassword(
      email as string,
      code as number,
      password as string
    );

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

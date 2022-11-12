/**
 * Authentication service module, contains all methods related
 * to users authentication
 * @module services/authService
 */

import { IUser } from "../index.type";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config";
import UserService from "./user.service";
import removePassword from "../utils/removePassword";
import generateRandomCode from "../utils/generateRandomCode";
import sendMail from "../utils/mail";

/**
 * user services
 * @const
 */
const userService = new UserService();

export default class AuthService {
  /**
   * Verify if the user exist and if password is correct
   * @async
   * @param {string} email address
   * @param {string} password
   * @returns {Promise<IUser>}
   */
  async getUser(email: string, password: string) {
    const user = await userService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    const userWithoutPassword = removePassword(user);
    return userWithoutPassword;
  }

  /**
   * Signs tokens for user auth
   * @async
   * @param {IUser} user
   * @returns {Promise<ISignTokens>}
   */
  async signTokens(user: IUser) {
    const payload = {
      sub: user.email,
      id: user.id,
    };

    /**
     * Create access token for user auth
     */
    const accessToken = jwt.sign(
      payload,
      CONFIG.ACCESS_TOKEN_SECRET as string,
      { expiresIn: CONFIG.ACCESS_TOKEN_EXPIRE }
    );

    /**
     * Create refresh token for user generate new access token
     */
    const refreshToken = jwt.sign(
      payload,
      CONFIG.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: CONFIG.REFRESH_TOKEN_EXPIRE,
      }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Generate random code for user auth
   * @async
   * @param {string} email user email address
   * @returns {Promise<string>}
   */
  async createCode(email: string) {
    const confirmCode = generateRandomCode();

    const user = await userService.findByEmail(email);
    user.confirmCode = confirmCode;
    user.save();

    sendMail({
      to: [email],
      subject: "Activation code",
      html: `${confirmCode}`,
      text: `${confirmCode}`,
    });

    return { message: "confirmation code was sent" };
  }

  /**
   * Verify code and active user account
   * @async
   * @param {string} email user email address
   * @param {number} confirmCode
   * @returns {Promise<User>}
   */
  async confirmCode(email: string, confirmCode: number) {
    const user = await userService.findByEmail(email);

    if (user.confirmCode !== confirmCode || confirmCode === 0) {
      throw boom.unauthorized();
    }

    if (!user.isActive) {
      user.isActive = true;
      user.confirmCode = 0;
      user.save();
    }

    return user;
  }

  /**
   * Change user password
   * @async
   * @param {string} email user email address
   * @param {number} confirmCode
   * @param {string} password user new password
   * @returns {Promise<boolean>}
   */
  async changeUserPassword(
    email: string,
    confirmCode: number,
    password: string
  ) {
    const user = await this.confirmCode(email, confirmCode);

    const newPasswordEncryted = await bcrypt.hash(password, 10);

    user.password = newPasswordEncryted;
    user.save();

    return true;
  }
}

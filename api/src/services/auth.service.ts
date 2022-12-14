/**
 * Authentication service module, contains all methods related
 * to users authentication
 * @module services/authService
 */

import { IPayload, IUser } from "../index.type";
import { User } from "../db/entity/User.entity";
import { ShoppingCart } from "../db/entity/ShoppingCart.entity";
import { WishList } from "../db/entity/WishList.entity";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config";
import UserService from "./user.service";
import removePassword from "../utils/removePassword";
import generateRandomCode from "../utils/generateRandomCode";
import sendMail from "../utils/mail";
import { OAuth2Client } from "google-auth-library";

/**
 * user services
 * @const
 */
const userService = new UserService();

export default class AuthService {
  /**
   * signin user or create
   * @param payload
   * @param password
   * @returns Promise
   */
  async findOrCreate(payload: IPayload, password: string) {
    const user = await this.getUser(payload.email, password as string);

    if (!user) {
      const newUser = await this.create({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        password: password as string,
      } as IUser);

      return newUser;
    }

    return user;
  }

  /**
   * Insert a new record into the db in the user's table
   * @async
   * @param data
   * @returns Promise
   */
  async create(data: Omit<IUser, "id">) {
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const userData = { ...data, password: encryptedPassword, isActive: false };

    /**
     * Setup user related entities
     */
    const user = User.create(userData);
    const shoppingCart = ShoppingCart.create();
    const wishList = WishList.create();

    user.shoppingCart = await shoppingCart.save();
    user.wishList = await wishList.save();

    /**
     * insert record in db
     */
    const newUser = await user.save();
    await this.createCode(data.email);

    /**
     * return user without password field
     */
    const userWithoutPassword = removePassword(newUser);
    return userWithoutPassword;
  }

  /**
   * Verify if the user exist and if password is correct
   * @async
   * @param email
   * @param password
   * @throws error unauthorized
   * @returns Promise
   */
  async getUser(email: string, password: string) {
    const user = await userService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    const userWithoutPassword = removePassword(user);
    return userWithoutPassword;
  }

  /**
   * Singin with google
   * @param token
   * @returns Promise
   */
  async googleSignin(token: string) {
    const client = new OAuth2Client(CONFIG.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CONFIG.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as unknown as IPayload;

    if (!payload) throw boom.unauthorized();

    const user = await this.findOrCreate(payload, token);

    const tokens = await this.signTokens(user as unknown as IUser);

    return tokens;
  }

  /**
   * Signs tokens for user auth
   * @async
   * @param user
   * @returns Promise
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
   * refresh access token
   * @param refreshToken
   * @returns
   */
  async refreshToken(refreshToken: string) {
    const payload: any = jwt.verify(
      refreshToken,
      CONFIG.REFRESH_TOKEN_SECRET || ""
    );

    if (!payload) throw boom.unauthorized();

    const accessToken = jwt.sign(
      { id: payload?.id, email: payload?.email },
      CONFIG.ACCESS_TOKEN_SECRET as string,
      { expiresIn: CONFIG.ACCESS_TOKEN_EXPIRE }
    );

    return accessToken;
  }

  /**
   * Generate random code for user auth
   * @async
   * @param email user email address
   * @throws error unauthorized
   * @returns Promise
   */
  async createCode(email: string) {
    const confirmCode = generateRandomCode();

    const user = await userService.findByEmail(email);
    user.confirmCode = confirmCode;
    await user.save();

    await sendMail({
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
   * @param email user email address
   * @param code
   * @throws error unauthorized
   * @returns Promise Promise
   */
  async confirmCode(email: string, code: number) {
    const user = await userService.findByEmail(email);

    if (user.confirmCode !== code || code === 0) {
      throw boom.unauthorized();
    }

    if (!user.isActive) {
      user.isActive = true;
      user.confirmCode = 0;
      await user.save();
    }

    return user;
  }

  /**
   * Change user password
   * @async
   * @param email user email address
   * @param code
   * @param password user new password
   * @throws error unauthorized
   * @returns Promise
   */
  async changeUserPassword(email: string, code: number, password: string) {
    const user = await this.confirmCode(email, code);

    const newPasswordEncryted = await bcrypt.hash(password, 10);

    user.password = newPasswordEncryted;
    await user.save();

    return true;
  }
}

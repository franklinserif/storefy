/**
 * user's related services for crud operations
 * @module services/userService
 */
import { User } from "../db/entity/User";
import { IUser } from "../index.type";
import removePassword from "../utils/removePassword";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import AuthService from "./auth.service";

/**
 * service related to authentication crud operations
 * @const
 */
const authService = new AuthService();

export default class UserService {
  /**
   * Insert a new record into the db in the user's table
   * @async
   * @param { Omit<IUser, "id">}  data
   * @returns {Promise<IUser>}
   */
  async create(data: Omit<IUser, "id">) {
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const userData = { ...data, password: encryptedPassword, isActive: false };

    const user = await User.create(userData);
    await authService.createCode(data.email);

    const userWithoutPassword = removePassword(user);
    return userWithoutPassword;
  }

  /**
   * Find all user in the db
   * @async
   * @returns {Promise<IUser[]>}
   */
  async findAll() {
    const users = await User.find();

    return users;
  }

  /**
   * Find user by email address withou password
   * @async
   * @param {string} id user id
   * @returns {Promise<IUser>}
   */
  async findOne(id: string) {
    const user = await User.findOneBy({ id });
    /**
     * exception if user is not found
     */
    if (!user) throw boom.notFound();

    const userWithoutPassword = removePassword(user);
    return userWithoutPassword as unknown as User;
  }

  /**
   * Find user by email address with password
   * @async
   * @param {string} email email address
   * @returns {Promise<Iuser>}
   */
  async findByEmail(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) throw boom.notFound();

    return user;
  }

  /**
   * Update user data in database
   * @async
   * @param {string} id user id
   * @param {Partial<IUser>} user data
   * @returns {Promise<IUser>}
   */
  async update(id: string, user: Partial<IUser>) {
    const updatedUser = await User.update(id, user);
    if (!updatedUser) throw boom.notFound();

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Remove user data from db
   * @async
   * @param {string} id user id
   *
   */
  async delete(id: string) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound();

    await user.remove();

    return { message: "user was delete from db" };
  }
}

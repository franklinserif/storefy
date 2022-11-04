/**
 * user's related services for crud operations
 * @module services/userService
 */
import { User } from "db/entity/User";
import { IUser } from "index.type";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";

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

    const userData = { ...data, password: encryptedPassword };

    const user = await User.create(userData);
    const { password, ...userWithoutPassword } = user;
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
   * Find user by id and return user data with all fields
   * @async
   * @param {string} id user id
   * @returns {Promise<IUser>}
   */
  async findOne(id: string) {
    const user = await User.findOneBy({ id });

    if (!user) throw boom.notFound();

    return user;
  }

  /**
   * Find user by email address withou password
   * @async
   * @param {string} email email address
   * @returns {Promise<Iuser>}
   */
  async findByEmail(email: string) {
    const user = await User.findOneBy({ email });

    if (!user) throw boom.notFound();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

    user.remove();

    return { message: "user was delete from db" };
  }
}

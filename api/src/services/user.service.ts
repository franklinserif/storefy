/**
 * user's related services for crud operations
 * @module services/userService
 */
import { User } from "db/entity/User";
import { IUser } from "index.type";
import { Boom } from "@hapi/boom";
import bcrypt from "bcrypt";

export default class UserService {
  /**
   * insert a new record into the db in the user's table
   * @async
   * @param { Omit<IUser, "id">}  data
   * @returns {Promise<>}
   */
  async create(data: Omit<IUser, "id">) {
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(data.password, 10);

    /**
     * Create user instance and merge data with typeORM user instance
     */
    const newUser = {
      ...new User(),
      ...data,
      password: encryptedPassword,
    };
  }
}

/**
 * user's related services for crud operations
 * @module services/userService
 */
import { User } from "../db/entity/User";
import { IUser } from "../index.type";
import removePassword from "../utils/removePassword";
import boom from "@hapi/boom";

export default class UserService {
  /**
   * Find all user in the db
   * @async
   */
  async findAll() {
    const users = await User.find();

    return users;
  }

  /**
   * Find user by email address withou password
   * @async
   * @param id user id
   * @returns Promise
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
   * @param email address
   * @returns Promise
   */
  async findByEmail(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) throw boom.notFound();

    return user;
  }

  /**
   * Update user data in database
   * @async
   * @param id user id
   * @param user data
   * @returns Promise
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
   * @param id user id
   * @returns Promise
   */
  async delete(id: string) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound();

    await user.remove();

    return { message: "user was delete from db" };
  }
}

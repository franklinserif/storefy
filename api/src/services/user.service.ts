/**
 * user's related services for crud operations
 * @module services/userService
 */
import { AppDataSource } from "../data-source";
import { User } from "../db/entity/User";
import { IUser } from "../index.type";
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
    const user = await User.findOne({
      where: { id },
      relations: [
        "products",
        "payment",
        "productRating",
        "productRating.product",
        "reviews",
        "shoppingCarts",
        "wishList",
      ],
    });
    /**
     * exception if user is not found
     */

    if (!user) throw boom.notFound();

    return user;
  }

  /**
   * Find user by email address with password
   * @async
   * @param email address
   * @returns Promise
   */
  async findByEmail(email: string) {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.password", "user.email", "user.id", "user.confirmCode"])
      .where("user.email = :email", { email })
      .getOne();

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
    if (updatedUser.affected === 0) throw boom.notFound();

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
    const rta = await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    if (rta.affected === 0) throw boom.notFound();

    return { message: "user was delete from db" };
  }
}

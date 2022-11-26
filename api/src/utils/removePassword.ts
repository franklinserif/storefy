import { User } from "../db/entity/User.entity";

/**
 * remove password from User object
 * @param user
 * @returns user without password
 */
export default function removePassword(user: User) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword as User;
}

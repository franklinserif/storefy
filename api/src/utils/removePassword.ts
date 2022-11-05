import { User } from "../db/entity/User";

/**
 * remove password from User object
 * @param {User} user
 */
export default function removePassword(user: User) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

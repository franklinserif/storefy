import { IUser } from "../index.type";

/**
 * remove password from User object
 * @param {IUser} user
 */
export default function removePassword(user: IUser) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

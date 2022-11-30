/**
 * This module contains the Local strategy auth
 * @module utils/strategies/local
 */
import { Strategy } from "passport-local";
import boom from "@hapi/boom";

import AuthService from "../../../services/auth.service";

const service = new AuthService();

const localStrategy = new Strategy(
  {
    // @ts-ignore
    usernameField: "email",
    passwordField: "password",
  },

  /**
   * It will verify if the user exist
   * and if exist compare the password to
   * very if it's correct
   * @param email
   * @param password
   * @param done
   * @returns Promise
   */
  async (email: string, password: string, done) => {
    try {
      const user = await service.getUser(email, password);

      if (!user) done(boom.unauthorized(), false);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;

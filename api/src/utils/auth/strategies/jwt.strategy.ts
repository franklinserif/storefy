/**
 * It contains all jwt strategry
 * @module utils/strategies/jwt
 */

import { Strategy, ExtractJwt } from "passport-jwt";

import CONFIG from "../../../config";

/**
 * @constant
 */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CONFIG.ACCESS_TOKEN_SECRET,
};

/**
 * JWT strategy for user in the middleware
 * @constant
 */
const jwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload);
});

export default jwtStrategy;

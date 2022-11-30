/**
 * this is the main strategies module
 * @module utils/strategies/index
 */

import passport from "passport";
import localStrategy from "./strategies/local.strategy";
import jwtStrategry from "./strategies/jwt.strategy";

passport.use(localStrategy);
passport.use(jwtStrategry);

/**
 * load all enviroment variables in a single object with dotenv lib
 * @module config
 */

import dotenv from "dotenv";

/**
 * it serve all enviroment variables in this modules
 */
dotenv.config();

const { API_PORT, DEV, DB_NAME, DB_USER, DB_PASSWORD, PRODUCTION } =
  process.env;

/**
 * it contain all enviroment variables
 */

export default {
  API_PORT,
  DEV: !!DEV,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PRODUCTION,
};

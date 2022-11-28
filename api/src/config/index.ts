/**
 * load all enviroment variables in a single object with dotenv lib
 * @module config
 */

import dotenv from "dotenv";

/**
 * it serve all enviroment variables in this modules
 */
dotenv.config();

const {
  API_PORT,
  DEV,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PRODUCTION,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
  NODEMAILER_HOST,
  NODEMAILER_EMAIL_USER,
  NODEMAILER_EMAIL_PASSWORD,
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

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
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  NODEMAILER_HOST,
  NODEMAILER_EMAIL_USER,
  NODEMAILER_EMAIL_PASSWORD,
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
};

import "reflect-metadata";
import { DataSource } from "typeorm";
import CONFIG from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "storefy-postgres-1",
  port: 5432,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});

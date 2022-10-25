import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";
import CONFIG from "./config";
import path from "path";
import { AppDataSource } from "./data-source";

const app: Application = express();

/**
 * middlewares
 */
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

/**
 * Add a list of allowed origins.
 * If you have more origins you would like to add, you can add them to the array below.
 */
const allowedOrigins = ["http://localhost:8080"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

/**
 * serve all static react files
 */

if (CONFIG.PRODUCTION) {
  app.use(express.static(path.join(__dirname, "client")));

  /**
   * serve react app index html
   */
  app.use("/*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
}

/**
 * API docs route
 */
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

/**
 * Initialize database connection
 */
AppDataSource.initialize()
  .then(async () => {
    app.listen(CONFIG.API_PORT, () => {
      console.log(`server is running on PORT ${CONFIG.API_PORT}`);
    });
  })
  .catch((error) => console.log(error));

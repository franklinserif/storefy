import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { boomErrorHandler } from "./middlewares/error.handler";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";
import CONFIG from "./config";
import path from "path";
import routeInit from "./routes";
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
app.use(boomErrorHandler);

/**
 * API docs route
 */
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

/**
 * serve all static react files
 */

if (!CONFIG.PRODUCTION) {
  console.log("entro");
  app.use(express.static(path.join(__dirname, "client")));

  /**
   * serve react app index html
   */
  app.use("/*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
} else {
  app.use("/", (_req: Request, res: Response) => {
    res.send("dev server");
  });
}

routeInit(app);

/**
 * Initialize database connection
 */
AppDataSource.initialize()
  .then(async () => {
    app.listen(CONFIG.API_PORT, () => {
      console.log(`server is running on PORT !${CONFIG.API_PORT}`);
    });
  })
  .catch((error) => console.log(error));

import express from "express";
import { getEnv, initDatabase, initMiddlewares, initRoutes } from "./helpers";

initDatabase(getEnv("MONGO_URL"))
  .then(() => {
    const app = express();

    initMiddlewares(app);
    initRoutes(app);

    app.listen(getEnv("PORT"));
  })
  .catch(() => {
    process.exit(1);
  });

import {
  fileRouter,
  quoteRouter,
  tariffRouter,
  trashRouter,
  userRouter,
} from "../routes";
import type { Express } from "express";

export const initRoutes = (app: Express) => {
  app.use("/files", fileRouter);
  app.use("/trash", trashRouter);
  app.use("/quote", quoteRouter);
  app.use("/tariffs", tariffRouter);
  app.use("/users", userRouter);
};

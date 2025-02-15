import cors from "cors";
import express from "express";
import type { Express } from "express";
import path from "path";

export const initMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "uploads")));
  app.use(express.urlencoded({ extended: false }));
};

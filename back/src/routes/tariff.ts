import { Router } from "express";
import { useVerifyToken } from "../middlewares/useVerifyToken";
import { createTariff, getTariffs } from "../controllers/tariff";

export const tariffRouter = Router();

tariffRouter.get("/", getTariffs);
tariffRouter.post("/", createTariff);

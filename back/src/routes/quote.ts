import { Router } from "express";
import { getQuote } from "../controllers/quote";
import { useVerifyToken } from "../middlewares/useVerifyToken";

export const quoteRouter = Router();

quoteRouter.get("/", useVerifyToken, getQuote);

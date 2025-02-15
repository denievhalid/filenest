import { Router } from "express";
import { login, register } from "../controllers/user";

export const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

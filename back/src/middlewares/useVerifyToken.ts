import jwt from "jsonwebtoken";
import { getEnv } from "../helpers";
import type { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";

export const useVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  jwt.verify(token, getEnv("JWT_SECRET"), async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = await UserModel.findOne({ _id: decoded?._id }).populate(
      "tariff",
    );

    return next();
  });
};

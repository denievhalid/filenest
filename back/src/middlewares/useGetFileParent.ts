import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const useGetFileParent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { parent } = req.body;

  req.parent = null;
  const lastElement = parent.split("/").pop();

  if (mongoose.Types.ObjectId.isValid(lastElement)) {
    req.parent = lastElement;
  }

  return next();
};

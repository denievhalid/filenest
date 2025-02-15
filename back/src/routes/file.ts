import { Router } from "express";
import {
  checkSecure,
  createFile,
  deleteFile,
  getFiles,
  renameFile,
  secureFile,
  unlockFile,
  zipFiles,
} from "../controllers/file";
import { multer } from "../helpers/multer";
import { useVerifyToken } from "../middlewares/useVerifyToken";
import { useGetFileParent } from "../middlewares/useGetFileParent";

export const fileRouter = Router();

fileRouter.get("/zip", zipFiles);
fileRouter.post("/list", useVerifyToken, useGetFileParent, getFiles);
fileRouter.post("/secure/check", useVerifyToken, checkSecure);
fileRouter.patch("/secure/unlock", useVerifyToken, unlockFile);
fileRouter.patch("/secure/lock", useVerifyToken, secureFile);
fileRouter.delete("/", useVerifyToken, deleteFile);
fileRouter.post(
  "/",
  useVerifyToken,
  multer.single("file"),
  useGetFileParent,
  createFile,
);
fileRouter.patch("/rename", useVerifyToken, renameFile);

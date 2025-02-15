import { Router } from "express";
import {
  getFiles,
  deleteFile,
  restoreFile,
  clearTrash,
} from "../controllers/trash";
import { useVerifyToken } from "../middlewares/useVerifyToken";

export const trashRouter = Router();

trashRouter.get("/", useVerifyToken, getFiles);
trashRouter.patch("/restore/:id", useVerifyToken, restoreFile);
trashRouter.delete("/clear", useVerifyToken, clearTrash);
trashRouter.delete("/remove/:id", useVerifyToken, deleteFile);

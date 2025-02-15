import type { Request, Response } from "express";
import { FileModel } from "../models/file";
import mongoose from "mongoose";
import { QuoteModel } from "../models/quote";

export const getFiles = async (req: Request, res: Response) => {
  try {
    const files = await FileModel.find({ isTrashed: true });
    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const restoreFile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await FileModel.findByIdAndUpdate(id, { isTrashed: false });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const result = await FileModel.aggregate([
      {
        $match: {
          _id: {
            $in: ids.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
    ]);

    let size = result[0]?.size || 0;

    await Promise.all([
      FileModel.deleteMany({
        _id: {
          $in: ids,
        },
        user: req.user._id,
      }),
      QuoteModel.findOneAndUpdate(
        {
          user: req.user._id,
        },
        {
          $inc: {
            used: -size,
          },
        },
      ),
    ]);

    await QuoteModel.findOneAndUpdate(
      {
        user: req.user._id,
        size: { $lt: 0 },
      },
      {
        size: 0,
      },
    );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const clearTrash = async (req: Request, res: Response) => {
  try {
    let size = 0;

    const result = await FileModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user),
        },
      },
      { $group: { _id: null, size: { $sum: "$size" } } },
    ]);

    if (result.length) {
      size = result[0]?.size;
    }

    await Promise.all([
      FileModel.deleteMany({
        folder: "trash",
        user: req.user,
      }),
      QuoteModel.findOneAndUpdate(
        {
          user: req.user._id,
        },
        {
          $inc: {
            used: -size,
          },
        },
      ),
    ]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

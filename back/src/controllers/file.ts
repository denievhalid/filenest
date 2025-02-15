import archiver from "archiver";
import fs from "fs";
import path from "path";
import { FileModel } from "../models/file";
import { QuoteModel } from "../models/quote";
import { getIncrementedFileName } from "../utils";
import type { Request, Response } from "express";

export const zipFiles = async (req: Request, res: Response) => {
  try {
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    const outputDir = path.resolve(__dirname, "../uploads");
    const outputPath = path.resolve(__dirname, "../uploads", "1.zip");

    res.attachment("archive.zip");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = fs.createWriteStream(outputPath);
    archive.pipe(output);

    [path.resolve(__dirname, "../uploads/123.mp4")].forEach((file) => {
      if (fs.existsSync(file)) {
        archive.file(file, { name: file.split("/").pop() }); // Используем только имя файла
      } else {
        console.warn(`Файл не найден: ${file}`);
      }
    });

    await archive.finalize();

    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getFiles = async (req: Request, res: Response) => {
  const { folder, parent } = req.body;

  try {
    const files = await FileModel.find({
      folder,
      parent: req.parent,
      user: req.user?._id,
    }).sort({
      createdAt: -1,
      isImage: 1,
    });
    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const secureFile = async (req: Request, res: Response) => {
  const { code, id } = req.body;

  try {
    const files = await FileModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isSecure: true,
        code,
      },
    );
    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const unlockFile = async (req: Request, res: Response) => {
  const { id, code } = req.body;

  const filter = {
    _id: id,
    code,
    user: req.user._id,
  };

  try {
    const file = await FileModel.findOne(filter);

    if (!file) {
      return res.status(400).json({
        data: "2323",
      });
    }

    await FileModel.findOneAndUpdate(filter, {
      code: null,
      isSecure: false,
    });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createFile = async (req: Request, res: Response) => {
  const { name } = req.body;

  const hasFile = Boolean(req.file);
  const parent = req.parent;

  let docs = {
    folder: "file",
    name,
    parent,
    originalName: name,
    user: req.user._id,
  };

  if (hasFile) {
    const {
      filename: name,
      originalName,
      mimetype,
      size,
    } = req.file as Express.Multer.File;

    // @ts-ignore
    docs = {
      ...docs,
      name,
      mimetype,
      size,
      originalName,
      isImage: true,
    };
  }

  try {
    const count = (await FileModel.countDocuments({
      originalName: docs.originalName,
    })) as number;

    docs.name = getIncrementedFileName(docs.name, count);

    await FileModel.create(docs);

    if (hasFile) {
      const quote = await QuoteModel.findOne({
        user: req.user._id,
      });

      if (docs.size > req.user.tariff.size - quote.used) {
        return res.status(400).json("Too large file");
      }

      await FileModel.findByIdAndUpdate(parent, {
        $inc: {
          size: docs.size,
        },
      });
      await QuoteModel.updateOne(
        {
          user: req.user._id,
        },
        {
          $inc: {
            used: docs.size,
          },
        },
        {
          new: true,
        },
      );
    }

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const renameFile = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  try {
    const filter = { name, user: req.user };

    const existing = await FileModel.findOne(filter);

    if (existing) {
      return res.status(422).json({
        message:
          "Файл или директория уже существует. Не удалось переименовать файл.",
      });
    }

    await FileModel.findOneAndUpdate(
      { _id: id, user: req.user },
      {
        name,
      },
    );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const checkSecure = async (req: Request, res: Response) => {
  const { id, code } = req.body;

  try {
    const file = await FileModel.findOne({
      _id: id,
      code,
      user: req.user._id,
    });

    if (!file) {
      return res.status(400).json({
        data: "Неверный пароль",
      });
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    await FileModel.updateMany(
      {
        _id: {
          $in: ids,
        },
        user: req.user._id,
      },
      {
        folder: "trash",
      },
    );

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

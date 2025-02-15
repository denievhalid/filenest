import { TariffModel } from "../models/tariff";
import type { Request, Response } from "express";

export const createTariff = async (req: Request, res: Response) => {
  const { name, size } = req.body;

  try {
    await TariffModel.create({ name, size });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getTariffs = async (req: Request, res: Response) => {
  try {
    const tariffs = await TariffModel.find();
    return res.status(200).json(tariffs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

import { QuoteModel } from "../models/quote";
import type { Request, Response } from "express";

export const getQuote = async (req: Request, res: Response) => {
  try {
    const quote = await QuoteModel.findOne({
      user: req.user._id,
    });
    return res.status(200).json(quote);
  } catch (err) {
    return res.status(500).json(err);
  }
};

import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
import { getEnv } from "../helpers";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { QuoteModel } from "../models/quote";
import { TariffModel } from "../models/tariff";

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const user = await UserModel.findOne({ login });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, firstName: user.firstName },
      getEnv("JWT_SECRET"),
      { expiresIn: getEnv("JWT_EXPIRATION") },
    );

    return res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, login, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ login });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const tariff = await TariffModel.getBasic();

    const user = await UserModel.create({
      firstName,
      login,
      password: hash,
      tariff,
    });

    await QuoteModel.create({
      user,
    });

    return res.status(201).json({
      user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

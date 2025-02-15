import mongoose from "mongoose";

export const initDatabase = (url: string) => {
  return mongoose.connect(url);
};

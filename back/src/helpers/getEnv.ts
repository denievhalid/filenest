import dotenv from "dotenv";

dotenv.config();

export const getEnv = (param: string) => {
  return process.env[param];
};

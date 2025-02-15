import { Schema, model } from "mongoose";

const schema = new Schema({
  firstName: { type: String, required: true },
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  tariff: {
    type: Schema.Types.ObjectId,
    ref: "Tariff",
  },
});

export const UserModel = model("User", schema);

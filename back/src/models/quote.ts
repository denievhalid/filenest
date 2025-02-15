import { Schema, model } from "mongoose";

const schema = new Schema({
  tariff: {
    type: Schema.Types.ObjectId,
    ref: "Tariff",
  },
  used: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const QuoteModel = model("Quote", schema);

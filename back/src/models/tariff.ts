import { Schema, model } from "mongoose";
import { Tariff } from "../constants";

const schema = new Schema({
  name: {
    type: String,
    enum: [Tariff.Basic, Tariff.Max, Tariff.Pro, Tariff.ProPlus],
  },
  size: {
    type: Number,
    required: true,
  },
});

schema.statics.getBasic = function () {
  return this.findOne({ name: Tariff.Basic });
};

export const TariffModel = model("Tariff", schema);

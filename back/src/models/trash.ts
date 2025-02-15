import { Schema, model } from "mongoose";

const schema = new Schema({
  file: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
});

export const TrashModel = model("Trash", schema);

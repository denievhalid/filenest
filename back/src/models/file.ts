import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    folder: {
      type: String,
      enum: ["file", "trash"],
    },
    originalName: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    isImage: Boolean,
    mimetype: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    isSecure: Boolean,
    code: String,
    size: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const FileModel = model("File", schema);

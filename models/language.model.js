import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    language: { type: String, unique: true, required: true, trim: true },
  },
  { timestamps: true, versionKey: false }
);

export const Language = mongoose.model("language", languageSchema);

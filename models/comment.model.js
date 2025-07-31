import mongoose from "mongoose";
let commentSchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

export const Comment = mongoose.model("comment", commentSchema);

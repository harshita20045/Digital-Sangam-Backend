import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: "article", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true, maxlength: 1000 },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "comment", default: null },
  },
  { timestamps: true, versionKey: false }
);

export const Comment = mongoose.model("comment", commentSchema);


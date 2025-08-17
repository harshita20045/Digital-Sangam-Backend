import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: "article", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true, versionKey: false }
);



export const Like = mongoose.model("like", likeSchema);

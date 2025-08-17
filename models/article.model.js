import mongoose from "mongoose";
const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    content: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    readTime: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    images: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

export const Article = mongoose.model("article", articleSchema);

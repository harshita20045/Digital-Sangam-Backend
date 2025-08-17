import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: "article", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, maxlength: 500 },
  },
  { timestamps: true, versionKey: false }
);

export const Review = mongoose.model("review", reviewSchema);

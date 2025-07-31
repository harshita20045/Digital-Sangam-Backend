import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    questions: [
      {
        questionText: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
      },
    ],
    timeLimit: Number,
    passingScore: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Quiz = mongoose.model("quiz", quizSchema);

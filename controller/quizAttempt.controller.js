import {QuizAttempt} from "../models/quiz_attempt.model.js"

export const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.body;
    const attempt = await QuizAttempt.create({ userId: req.user.id, quizId });
    return res.status(201).json({ message: "Quiz submitted", attempt });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user.id }).populate("quizId");
    return res.status(200).json({ attempts });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttemptsByQuiz = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ quizId: req.params.quizId }).populate("userId");
    return res.status(200).json({ attempts });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttemptById = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId).populate("userId quizId");
    return res.status(200).json({ attempt });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAttempt = async (req, res) => {
  try {
    await QuizAttempt.findByIdAndDelete(req.params.attemptId);
    return res.status(200).json({ message: "Attempt deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

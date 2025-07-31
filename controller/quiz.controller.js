import { Quiz } from "../models/quize.model.js";

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({ ...req.body, createdBy: req.user.id });
    return res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    return res.status(200).json({ quizzes });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    return res.status(200).json({ quiz });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ message: "Quiz updated", updated });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyCreatedQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id });
    return res.status(200).json({ quizzes });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
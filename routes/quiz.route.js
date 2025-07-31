import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getMyCreatedQuizzes,
} from "../controller/quiz.controller.js";

const router = express.Router();

// Admin or creator routes
router.post("/create", auth, isAdmin, createQuiz);
router.get("/my-quizzes", auth, isAdmin, getMyCreatedQuizzes);
router.put("/:id", auth, isAdmin, updateQuiz);
router.delete("/:id", auth, isAdmin, deleteQuiz);

// Public routes
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);

export default router;

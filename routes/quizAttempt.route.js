import express from "express";
import { auth, isUser, isAdmin } from "../middleware/auth.js";
import {
  submitQuizAttempt,
  getMyAttempts,
  getAttemptsByQuiz,
  getAttemptById,
  deleteAttempt,
} from "../controller/quizAttempt.controller.js";

const router = express.Router();

// User actions
router.post("/submit/:quizId", auth, isUser, submitQuizAttempt);
router.get("/my", auth, isUser, getMyAttempts);

// Admin actions
router.get("/quiz/:quizId", auth, isAdmin, getAttemptsByQuiz);
router.get("/:attemptId", auth, getAttemptById); // Both user & admin can see
router.delete("/:attemptId", auth, deleteAttempt); // Admin or owner

export default router;

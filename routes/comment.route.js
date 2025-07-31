import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  addComment,
  deleteComment,
  getCommentsOnArticle,
  getCommentsByUser,
} from "../controller/comment.controller.js";

const router = express.Router();

// POST: /comment/:articleId
router.post("/:articleId", auth, addComment);

// DELETE: /comment/:commentId
router.delete("/:commentId", auth, deleteComment);

// GET: /comment/article/:articleId
router.get("/article/:articleId", getCommentsOnArticle);

// GET: /comment/user/me
router.get("/user/me", auth, getCommentsByUser);

export default router;

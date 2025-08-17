import express from "express";
import {
  createArticle,
  updateArticle,
  deleteArticle,
  seeMyArticles,
  seeAllArticles,
  seeArticleById,
  seeArticleByAuthor,
  seeArticlesByCategory,
  seeArticlesByDate,
  seeArticlesByKeyword,
  seeArticlesByAuthorAndCategory,
  getAllArticlesByTitle,
} from "../controller/article.controller.js";

import { auth, isUser } from "../middleware/auth.js";
import { uploadImages } from "../config/uploadImages.js";

const router = express.Router();


router.post("/", uploadImages.array("images"), createArticle);
router.put("/:id",uploadImages.array("images"), updateArticle);
router.get("/my-articles", auth, isUser, seeMyArticles);
router.get("/all", seeAllArticles);
router.get("/:id", auth, isUser, seeArticleById);
router.delete("/:id", deleteArticle);
router.get("/search", auth, isUser, getAllArticlesByTitle);
router.get("/author/:authorId", seeArticleByAuthor);
router.get("/category/:category", auth, isUser, seeArticlesByCategory);
router.get("/date", auth, isUser, seeArticlesByDate);
router.get("/keyword", auth, isUser, seeArticlesByKeyword);
router.get("/author/:authorId/category/:category", auth, isUser, seeArticlesByAuthorAndCategory);

export default router;

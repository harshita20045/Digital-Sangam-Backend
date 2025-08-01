import express from "express";
import { createArticle, deleteArticle, getAllArticlesByTitle, seeAllArticles, seeArticleByAuthor, seeArticleById, seeArticlesByAuthorAndCategory, seeArticlesByCategory, seeArticlesByDate, seeArticlesByKeyword, seeMyArticles, updateArticle } from "../controller/article.controller.js";
import multer from "multer";

import { auth,isUser } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "public/article" });

router.post("/",  upload.array("images"), createArticle);
router.get("/my-articles", auth, isUser, seeMyArticles);
router.get("/all", seeAllArticles);
router.get("/:id", auth, isUser, seeArticleById);
router.put("/:id", auth, isUser, upload.array("images"), updateArticle);
router.delete("/:id", auth, isUser, deleteArticle);
router.get("/search", auth, isUser, getAllArticlesByTitle);
router.get("/author/:authorId", seeArticleByAuthor);
router.get("/category/:category", auth, isUser, seeArticlesByCategory);
router.get("/date", auth, isUser, seeArticlesByDate);
router.get("/keyword", auth, isUser, seeArticlesByKeyword);
router.get("/author/:authorId/category/:category", auth, isUser, seeArticlesByAuthorAndCategory);
 



export default router;

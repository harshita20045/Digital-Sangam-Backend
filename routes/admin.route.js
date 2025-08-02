import express from "express";
import {
  getAllDialects,
  updateDialectStatus,
  deleteDialect,
  getApprovedDialects,
  createLanguage,
  getAllLanguage,
  deleteLanguage,
  getAllArticles,
  getAdminStats,
  updateArticleStatus,
} from "../controller/admin.controller.js";
import { login } from "../controller/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/dialects", getAllDialects);
router.get("/stats", getAdminStats);
router.get("/articles", getAllArticles);
router.put("/update-articles/:id", updateArticleStatus);

router.put("/update-dialects/:id", updateDialectStatus);

router.delete("/delete-dialects/:id", deleteDialect);

router.get("/dialects/approved", getApprovedDialects);

router.post("/languages", createLanguage);

router.get("/languages", getAllLanguage);

router.delete("/languages/:id", deleteLanguage);

export default router;

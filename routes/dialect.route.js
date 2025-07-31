
import express from "express";
import {

createDialect,
 deleteDialect,
 getAllDialects,
 getApprovedDialects,
 getUserDialects,
 updateDialectStatus
  
} from "../controller/dialect.controller.js";
import { auth, isAdmin } from "../middleware/auth.js";
import { createArticle } from "../controller/article.controller.js";

const router = express.Router();

// User Routes
router.post("/add", auth,createArticle);
router.get("/my", auth, getUserDialects);
router.get("/all", auth, getAllDialects);
router.put("/update/:id", auth, updateDialectStatus);
router.delete("/delete/:id", auth, deleteDialect);

// Admin Routes
router.get("/all", auth, isAdmin, getAllDialects);

router.patch("/approve/:id", auth, isAdmin, getApprovedDialects);

router.delete("/delete/:id", auth, isAdmin, deleteDialect);

export default router;

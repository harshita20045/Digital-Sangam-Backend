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
import { uploadAudio } from "../config/uploadAudio.js"; 

const router = express.Router();

router.post("/add", uploadAudio.single("audio"), createDialect);

router.get("/author/:id", getUserDialects);
router.get("/all", getAllDialects);
router.put("/update/:id", auth, updateDialectStatus);
router.patch("/approve/:id", auth, isAdmin, getApprovedDialects);
router.delete("/delete/:id", auth, deleteDialect);
router.delete("/delete/:id", auth, isAdmin, deleteDialect);

export default router;

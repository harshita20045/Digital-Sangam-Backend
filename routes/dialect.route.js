
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


const router = express.Router();

router.post("/add", auth,createDialect);
router.get("/my", auth, getUserDialects);
router.get("/all",  getAllDialects);
router.put("/update/:id", auth, updateDialectStatus);
router.delete("/delete/:id", auth, deleteDialect);


router.patch("/approve/:id", auth, isAdmin, getApprovedDialects);

router.delete("/delete/:id", auth, isAdmin, deleteDialect);

export default router;

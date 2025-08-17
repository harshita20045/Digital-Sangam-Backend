import express from "express"
import { addLike,  getNumberOfLikes, removeLike } from "../controller/like.controller.js";

const router= express.Router();

router.post("/add", addLike);
router.delete("/remove", removeLike);
router.get("/:articleId", getNumberOfLikes);

export default router;
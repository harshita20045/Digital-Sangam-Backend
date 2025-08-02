import express from "express"
import { createLanguage, getAllLanguage } from "../controller/language.controller.js"

const router=express.Router()

router.post("/add",createLanguage)
router.get("/all",getAllLanguage)

export default router
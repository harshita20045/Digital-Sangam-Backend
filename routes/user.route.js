import express from "express";
import multer from "multer";
import { auth,isUser } from "../middleware/auth.js";
import {
  signUp,
  verifyAccount,
  login,
  logout,
  createProfile,
  getUserById,
  getAllUsers,

  deleteUser,
  updateUserProfile,
  getAllUserByName,
} from "../controller/user.controller.js";

const upload = multer({ dest: "public/profile" });
const router = express.Router();

router.post("/signup", signUp);
router.post("/verification", verifyAccount);
router.post("/login", login);
router.get("/logout", isUser, logout);

router.get("/search", auth, isUser, getAllUserByName);
router.patch("/profile/:userId", upload.single("profileImage"), createProfile);
router.get("/:userId", auth, isUser, getUserById);
router.get("/", auth, isUser, getAllUsers);
router.put("/:userId", auth, isUser, updateUserProfile);
router.delete("/:userId", auth, isUser, deleteUser);


export default router;

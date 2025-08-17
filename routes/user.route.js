import express from "express";
import multer from "multer";
import { auth, isUser } from "../middleware/auth.js";
import {
  signUp,
  verifyAccount,
  login,
  logout,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUserProfile,
  getAllUserByName,
  updateProfile,
} from "../controller/user.controller.js";
import { body } from "express-validator";

const upload = multer({ dest: "public/profile" });
const router = express.Router();

router.post("/signup", signUp);
router.post("/verification", verifyAccount);
router.post("/login", login);
router.get("/logout", logout);

router.get("/search", auth, isUser, getAllUserByName);
router.patch(
  "/profile/:userId",
  (req, res, next) => {
    console.log("Url tak pahoch gaya");
    next();
  },
  upload.single("profileImage"),
  [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("contact")
      .optional()
      .isMobilePhone()
      .withMessage("Invalid contact number"),
    body("address").optional().isString(),
    body("city").optional().isString(),
    body("state").optional().isString(),
    body("country").optional().isString(),
    body("dob")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Invalid date of birth"),
    body("bio")
      .optional()
      .isLength({ max: 300 })
      .withMessage("Bio should not exceed 300 characters"),
    body("designation").optional().isString(),
    body("linkedin")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Invalid LinkedIn URL"),
    body("twitter")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Invalid Twitter URL"),
    body("facebook")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Invalid Facebook URL"),
    body("instagram")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Invalid Instagram URL"),
  ],
  (req, res, next) => {
    console.log("validation tak");
    next();
  },
  updateProfile
);

router.get("/:userId", auth, isUser, getUserById);
router.get("/", auth, isUser, getAllUsers);
router.put("/:userId", auth, isUser, updateUserProfile);
router.delete("/:userId", auth, isUser, deleteUser);

export default router;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import articleRouter from "./routes/article.route.js";
import dialectRouter from "./routes/dialect.route.js";
import languageRouter from "./routes/language.route.js";
import chatRouter from "./routes/chat.route.js";
import adminRouter from "./routes/admin.route.js";
import quizAttemptRouter from "./routes/quizAttempt.route.js";
import speechRouter from "./routes/speech.route.js";


dotenv.config();
const app = express();

app.use(cors({
  origin: "https://digital-sangam-frontend.onrender.com",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database not connected", err));


app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/dialect", dialectRouter);
app.use("/language", languageRouter);
app.use("/quizAttempt", quizAttemptRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);
app.use("/tts", speechRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));

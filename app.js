import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import articleRouter from "./routes/article.route.js";
import dialectRouter from "./routes/dialect.route.js";
import languageRouter from "./routes/language.route.js"

import adminRouter from "./routes/admin.route.js";
import quizAttemptRouter from "./routes/quizAttempt.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:3001", 
  credentials: true               
}));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database.....");
  })
  .catch((err) => {
    console.error("Database not connected", err);
  });
  app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/article", articleRouter);
app.use("/dialect", dialectRouter);
app.use("/language",languageRouter)
//app.use("/quiz", quizRouter);
app.use("/quizAttempt", quizAttemptRouter);
app.use("/admin", adminRouter);


app.listen(process.env.PORT, () => {
  console.log("Server Started");
});

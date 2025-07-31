import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (request, response, next) => {
  const { token } = request.cookies;
  console.log(token);
  if (!token) throw new Error("Unauthorized User");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return response.status(401).json({ message: "Unauthorized User" });
  }
};

export const isAdmin = (request, response, next) => {
  if (request.user.role !== "admin") {
    console.log(request.user.role);
    return response.status(400).json({ message: "Admin Can Only access this" });
  }
  next();
};

export const isUser = (request, response, next) => {
  if (request.user.role !== "user") {
    console.log(request.user.role);
    return response.status(400).json({ message: "User Can Only access this" });
  }
  next();
};

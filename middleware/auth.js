import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Authentication middleware: verifies token and attaches user info
export const auth = (request, response, next) => {
  const { token } = request.cookies;

  if (!token) {
    return response.status(401).json({ message: "Unauthorized User. Token not found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // Attaches user info (including role) to request
    next();
  } catch (err) {
    return response.status(401).json({ message: "Unauthorized User. Invalid token." });
  }
};

// Middleware to check for admin role
export const isAdmin = (request, response, next) => {
  if (request.user.role !== "admin") {
    return response.status(403).json({ message: "Admins only. Access denied." });
  }
  next();
};

// Middleware to check for user role
export const isUser = (request, response, next) => {
  if (request.user.role !== "user") {
    return response.status(403).json({ message: "Users only. Access denied." });
  }
  next();
};

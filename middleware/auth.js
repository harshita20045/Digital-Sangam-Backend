import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const { token } = req.cookies || {};
  if (!token) return res.status(401).json({ message: "Unauthorized: token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Admins only" });
  next();
};

export const isUser = (req, res, next) => {
  if (req.user?.role !== "user") return res.status(403).json({ message: "Users only" });
  next();
};

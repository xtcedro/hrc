// /middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
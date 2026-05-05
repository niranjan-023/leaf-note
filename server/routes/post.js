import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify user
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// CREATE POST
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, author, content, rating } = req.body;

    const post = new Post({
      user: req.userId,
      title,
      author,
      content,
      rating,
    });

    await post.save();

    res.status(201).json({ message: "Post created" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
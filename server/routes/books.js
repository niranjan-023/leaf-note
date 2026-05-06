import express from "express";
import Post from "../models/Post.js";

const router = express.Router();


// GET ALL UNIQUE BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Post.aggregate([
      {
        $group: {
          _id: {
            normalizedTitle: "$normalizedTitle",
            normalizedAuthor: "$normalizedAuthor",
          },

          title: { $first: "$title" },
          author: { $first: "$author" },

          avgRating: { $avg: "$rating" },

          totalLikes: {
            $sum: {
              $size: "$likes",
            },
          },

          totalPosts: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          normalizedTitle: "$_id.normalizedTitle",
          normalizedAuthor: "$_id.normalizedAuthor",

          avgRating: {
            $round: ["$avgRating", 1],
          },

          totalLikes: 1,
          totalPosts: 1,
        },
      },
    ]);

    res.json(books);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});



// GET POSTS OF SPECIFIC BOOK
router.get("/:title/:author", async (req, res) => {
  try {
    const posts = await Post.find({
      normalizedTitle: req.params.title,
      normalizedAuthor: req.params.author,
    }).sort({ createdAt: -1 });

    res.json(posts);

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
import express from "express";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import normalizeText from "../utils/normalize.js";

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
			normalizedTitle: normalizeText(title),
			normalizedAuthor: normalizeText(author),
			content,
			rating,
		});

		await post.save();

		res.status(201).json({ message: "Post created" });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const posts = await Post.aggregate([
			{
				$addFields: {
					likesCount: { $size: "$likes" },
				},
			},
			{
				$sort: {
					likesCount: -1,
					rating: -1,
					createdAt: -1,
				},
			},
		]);

		await Post.populate(posts, {
			path: "user",
			select: "name",
		});

		res.json(posts);
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

// LIKE / UNLIKE POST
router.put("/like/:id", authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		const alreadyLiked = post.likes.includes(req.userId);

		if (alreadyLiked) {
			post.likes = post.likes.filter(
				(id) => id.toString() !== req.userId
			);
		} else {
			post.likes.push(req.userId);
		}

		await post.save();

		res.json(post);
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

// GET USER POSTS
router.get("/my-posts", authMiddleware, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId })
			.sort({ createdAt: -1 });

		res.json(posts);
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

// DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (post.user.toString() !== req.userId) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		await post.deleteOne();

		res.json({ message: "Post deleted" });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

// UPDATE POST
router.put("/:id", authMiddleware, async (req, res) => {
	try {
		const { title, author, content, rating } = req.body;

		const post = await Post.findById(req.params.id);

		if (post.user.toString() !== req.userId) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		post.title = title;
		post.author = author;
		post.normalizedTitle = normalizeText(title);
		post.normalizedAuthor = normalizeText(author);
		post.content = content;
		post.rating = rating;


		await post.save();

		res.json({ message: "Post updated" });
	} catch {
		res.status(500).json({ message: "Server error" });
	}
});

// GET PROFILE DATA
router.get("/profile", async (req, res) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");

		res.json(user);
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
});

export default router;
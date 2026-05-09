import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import bookRoutes from "./routes/books.js";

dotenv.config();

const app = express();


// =========================
// CORS
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin
      // mobile apps / postman etc
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },

    credentials: true,
  })
);


// =========================
// MIDDLEWARE
// =========================

app.use(express.json());


// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/books", bookRoutes);


// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
  res.send("LeafNote API is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});


// =========================
// DATABASE
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });
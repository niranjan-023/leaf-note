# 🌿 LeafNote

LeafNote is a modern full-stack social platform for book lovers where users can share reviews, discover books, explore community discussions, and interact through likes and ratings.

Built using React, Node.js, Express, MongoDB Atlas, JWT Authentication, Tailwind CSS v4, and AI-powered content moderation.

🔗 Live Website: https://leaf-note.netlify.app/

---

# ✨ Features

## 🔐 Authentication
- JWT-based authentication
- Secure login & signup flow
- Protected and public routes
- Automatic session validation
- Auto logout on invalid/expired token

---

## 📝 Posts & Reviews
- Create book review posts
- Edit and delete posts
- Like/unlike posts
- Ratings system

---

## 📚 Explore Books
- Community-driven books page
- Dynamic book cover fetching using OpenLibrary API
- Book aggregation based on normalized title + author

---

## 💬 Book Discussions
- Community posts grouped by book
- Dynamic book cover rendering with fallback support

---

## 👤 User Profile
- User profile dashboard
- Post statistics
- Total likes statistics

---

## 🛡️ AI Content Moderation

LeafNote integrates **SentinelAI**, an AI-powered moderation system developed for detecting unsafe or harmful text content before posts are published.

Moderation happens during:
- Post creation
- Post editing

Unsafe content is automatically blocked before reaching the database.

### SentinelAI

SentinelAI is an AI moderation API designed to detect:
- Toxic content
- Hate speech
- Offensive language
- Spam
- Sexual content
- Violent or harmful text

It uses a hybrid moderation architecture combining:
- Machine Learning (TF-IDF + Logistic Regression)
- Rule-Based Moderation
- FastAPI Backend

🔗 SentinelAI Repository: https://github.com/niranjan-023/SentinelAI.git

---

# ⚙️ Tech Stack

## Frontend
- React
- React Router
- Tailwind CSS v4
- Axios
- Vite

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## AI Moderation
- FastAPI
- Scikit-learn
- TF-IDF
- Logistic Regression

---

# 🚀 Deployment

LeafNote is deployed using:
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# 📌 Future Improvements

- Search functionality
- Infinite scrolling
- Bookmarks & saved posts
- Comment system
- Recommendation engine
- Dark mode
- User avatars
- Real-time notifications

---
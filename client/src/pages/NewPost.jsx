import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { validateContentSafety } from "../utils/moderation";

function NewPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    rating: 1,
  });

  const [checking, setChecking] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setChecking(true);

      // CONCATENATED TEXT
      const combinedText = `
        ${form.title}
        ${form.author}
        ${form.content}
      `;

      // MODERATION CHECK
      const moderation = await validateContentSafety(
        combinedText
      );

      // BLOCK UNSAFE
      if (moderation.prediction === 0) {
        alert(
          "Your post contains inappropriate or unsafe content."
        );

        setChecking(false);
        return;
      }

      // CREATE POST
      const token = localStorage.getItem("token");

      await API.post("/posts", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

	  alert("Post published!");
      navigate("/view-posts");

    } catch {
      alert("Error creating post");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Layout>
      <div className="
        max-w-3xl
        mx-auto
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-8
      ">

        <div className="mb-8">
          <h1 className="
            text-4xl
            font-extrabold
            text-slate-800
          ">
            Create New Post
          </h1>

          <p className="text-gray-500 mt-3">
            Share your thoughts with the community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            name="title"
            placeholder="Book title"
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
            required
          />

          <input
            name="author"
            placeholder="Author"
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
            required
          />

          <textarea
            name="content"
            placeholder="Write your thoughts..."
            onChange={handleChange}
            rows="10"
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
              resize-none
            "
            required
          />

          <select
            name="rating"
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
          >
            {[1,2,3,4,5].map((num) => (
              <option key={num} value={num}>
                {num} Star
              </option>
            ))}
          </select>

          <button
            disabled={checking}
            className="
              bg-emerald-500
              hover:bg-emerald-600
              disabled:bg-gray-400
              text-white
              py-4
              rounded-2xl
              transition
              font-semibold
              shadow-md
            "
          >
            {checking
              ? "Validating Content..."
              : "Publish Post"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default NewPost;
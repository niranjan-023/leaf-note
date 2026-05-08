import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { validateContentSafety } from "../utils/moderation";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    rating: 1,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get("/posts");

        const post = res.data.find((p) => p._id === id);

        if (post) {
          setForm({
            title: post.title,
            author: post.author,
            content: post.content,
            rating: post.rating,
          });
        }
      } catch {
        console.log("Error loading post");
      }
    };

    fetchPost();
  }, [id]);

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

      const token = localStorage.getItem("token");

      await API.put(`/posts/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post updated!");

      navigate("/view-posts");

    } catch {
      alert("Error updating post");
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
            Edit Post
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
            value={form.title}
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
            value={form.author}
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
            value={form.content}
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
            value={form.rating}
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
              : "Update Post"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditPost;
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    rating: 1,
  });

  // Fetch post data
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/posts/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post updated!");
      navigate("/home");
    } catch {
      alert("Error updating post");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-6">
          Edit Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            rows="5"
            required
          />

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>
                {num} Star
              </option>
            ))}
          </select>

          <button className="bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600">
            Update Post
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default EditPost;
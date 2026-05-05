import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    rating: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/posts", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post created!");
      navigate("/home");
    } catch {
      alert("Error creating post");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-6">
          New Post
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Book Title"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="author"
            placeholder="Author"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            name="content"
            placeholder="Your thoughts..."
            onChange={handleChange}
            className="border p-3 rounded-lg"
            rows="5"
            required
          />

          <select
            name="rating"
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
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default NewPost;
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data);
      } catch {
        console.log("Error fetching posts");
      }
    };

    fetchPosts();
  }, []);

  // Sorting logic
  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === "likes") return b.likes.length - a.likes.length;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "author") return a.author.localeCompare(b.author);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <Layout>
      {/* SORT DROPDOWN */}
      <div className="mb-6 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="latest">Latest</option>
          <option value="likes">Most Liked</option>
          <option value="rating">Highest Rated</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* POSTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedPosts.map((post) => (
          <div key={post._id} className="bg-white p-5 rounded-xl shadow-sm">
            
            <h2 className="text-lg font-semibold line-clamp-2">
              {post.title}
            </h2>

            <p className="text-sm text-gray-500 line-clamp-1">
              {post.author}
            </p>

            <p className="text-gray-600 mt-2 line-clamp-3">
              {post.content}
            </p>

            <div className="mt-2 text-yellow-500">
              {"⭐".repeat(post.rating)}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between mt-4 text-sm">
              <span>❤️ {post.likes.length}</span>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/edit-post/${post._id}`)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    if (!confirm("Delete this post?")) return;

                    try {
                      const token = localStorage.getItem("token");

                      await API.delete(`/posts/${post._id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });

                      setPosts((prev) =>
                        prev.filter((p) => p._id !== post._id)
                      );
                    } catch {
                      alert("Error deleting post");
                    }
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ViewPosts;
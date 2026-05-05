import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user
        const userRes = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data);

        // Get user posts
        const postRes = await API.get("/posts/my-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPosts(postRes.data);
      } catch {
        handleLogout(); // auto logout if token invalid
      }
    };

    fetchData();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Calculate total likes
  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likes?.length || 0),
    0
  );

  if (!user) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
        
        <h2 className="text-3xl font-semibold text-emerald-600 mb-2">
          {user.name}
        </h2>

        <p className="text-gray-500 mb-6">{user.email}</p>

        {/* Stats */}
        <div className="flex justify-around mb-6">
          <div>
            <p className="text-xl font-semibold">{posts.length}</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>

          <div>
            <p className="text-xl font-semibold">{totalLikes}</p>
            <p className="text-gray-500 text-sm">Likes</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/new-post")}
            className="bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600"
          >
            + New Post
          </button>

          <button
            onClick={() => navigate("/view-posts")}
            className="bg-gray-100 py-3 rounded-xl hover:bg-gray-200"
          >
            View Posts
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [checking, setChecking] = useState(false);

  const handleLogout = () => {
	setChecking(true);
    clearAuth();
	setChecking(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data);

        const postRes = await API.get("/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(postRes.data);

      } catch {
        handleLogout();
      }
    };

    fetchData();
  }, []);

  

  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likes?.length || 0),
    0
  );

  if (!user) {
    return (
      <Layout>
        <div className="skeleton h-72 rounded-3xl" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="
        max-w-2xl
        mx-auto
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-8
      ">

        {/* HEADER */}
        <div className="text-center">

          <div className="
            w-24
            h-24
            rounded-full
            bg-gradient-to-br
            from-emerald-500
            to-green-600
            mx-auto
            flex
            items-center
            justify-center
            text-white
            text-3xl
            font-bold
            shadow-lg
          ">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2 className="
            text-4xl
            font-extrabold
            text-slate-800
            mt-5
          ">
            {user.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>
        </div>

        {/* STATS */}
        <div className="
          grid
          grid-cols-2
          gap-6
          mt-10
        ">

          <div className="
            bg-gray-50
            rounded-2xl
            p-6
            text-center
          ">
            <p className="text-3xl font-bold text-blue-400">
              {posts.length}
            </p>

            <p className="text-blue-500 mt-2">
              Posts ✍️
            </p>
          </div>

          <div className="
            bg-gray-50
            rounded-2xl
            p-6
            text-center
          ">
            <p className="text-3xl font-bold text-pink-600">
              {totalLikes}
            </p>

            <p className="text-pink-500 mt-2">
              Likes ❤️
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-4 mt-10">

          <button
            onClick={() => navigate("/new-post")}
            className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              py-3
              rounded-2xl
              transition
              font-semibold
              shadow-md
            "
          >
            + New Post
          </button>

          <button
            onClick={() => navigate("/view-posts")}
            className="
              bg-gray-100
              hover:bg-gray-200
              py-3
              rounded-2xl
              transition
              font-medium
            "
          >
            My Posts
          </button>

          <button
            onClick={handleLogout}
			disabled={checking}
            className="
              bg-red-500
              hover:bg-red-600
			  disabled:bg-gray-400
              text-white
              py-3
              rounded-2xl
              transition
              font-semibold
              shadow-md
              mt-3
            "
          >
			{checking ? "Logging Out" : "Logout"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
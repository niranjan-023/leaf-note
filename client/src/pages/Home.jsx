import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch {
        console.log("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

        {/* FEED */}
        <div className="flex flex-col gap-8 items-center">

          {/* PAGE HEADER */}
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-800">
              Community Feed
            </h1>

            <p className="text-gray-500 mt-2">
              Explore thoughts, reviews, and discussions from readers.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton w-full max-w-2xl h-72 rounded-3xl"
                />
              ))}
            </>
          )}

          {/* EMPTY STATE */}
          {!loading && posts.length === 0 && (
            <div className="
              bg-white
              rounded-3xl
              p-12
              text-center
              shadow-sm
              border
              border-gray-100
              w-full
              max-w-2xl
            ">
              <h2 className="text-2xl font-bold text-gray-700">
                No posts yet 📚
              </h2>

              <p className="text-gray-500 mt-3">
                Be the first one to share your reading experience.
              </p>
            </div>
          )}

          {/* POSTS */}
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              setPosts={setPosts}
              user={user}
            />
          ))}
        </div>

        {/* SIDEBAR */}
        <Sidebar />
      </div>
    </Layout>
  );
}

export default Home;
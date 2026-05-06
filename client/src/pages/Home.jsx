import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch {
        console.log("Error fetching posts");
      }
    };

    fetchPosts();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        
        {/* FEED */}
        <div className="flex flex-col gap-6 items-center">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              posts={posts}
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
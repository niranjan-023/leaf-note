import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PostCard from "../components/PostCard";
import BookSidebar from "../components/BookSidebar";

function BookPosts() {
  const { title, author } = useParams();

  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get(
          `/books/${title}/${author}`
        );

        setPosts(res.data);
      } catch {
        console.log("Error fetching book posts");
      }
    };

    fetchPosts();
  }, [title, author]);

  if (!posts.length) {
    return (
      <Layout>
        <p className="text-center text-gray-500">
          Loading posts...
        </p>
      </Layout>
    );
  }

  const book = posts[0];

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        
        {/* POSTS FEED */}
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

        {/* RIGHT SIDEBAR */}
        <BookSidebar
          title={book.title}
          author={book.author}
        />

      </div>
    </Layout>
  );
}

export default BookPosts;
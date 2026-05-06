import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PostCard from "../components/PostCard";
import BookSidebar from "../components/BookSidebar";

function BookPosts() {
  const { title, author } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [title, author]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="
                skeleton
                h-72
                rounded-3xl
              "
            />
          ))}
        </div>
      </Layout>
    );
  }

  if (!posts.length) {
    return (
      <Layout>
        <div
          className="
            bg-white
            rounded-3xl
            p-14
            text-center
            shadow-sm
            border
            border-gray-100
          "
        >
          <h2 className="text-3xl font-bold text-gray-700">
            No discussions available 📖
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Be the first to start the discussion.
          </p>
        </div>
      </Layout>
    );
  }

  const book = posts[0];

  return (
    <Layout>

      {/* TOP HEADER */}
      <div className="mb-10">

        <h1
          className="
            text-4xl
            md:text-5xl
            font-extrabold
            tracking-tight
            text-slate-800
          "
        >
          Book Discussions
        </h1>

        <p
          className="
            text-gray-500
            mt-3
            text-lg
            leading-8
            max-w-2xl
          "
        >
          Explore what readers think about this book.
        </p>
      </div>

      {/* CONTENT */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[minmax(0,1fr)_340px]
          gap-10
          items-start
        "
      >

        {/* FEED */}
        <div className="flex flex-col gap-8 items-center">
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
        <BookSidebar
          title={book.title}
          author={book.author}
        />
      </div>
    </Layout>
  );
}

export default BookPosts;
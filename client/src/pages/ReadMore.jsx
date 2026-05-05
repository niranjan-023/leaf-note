import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function ReadMore() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [cover, setCover] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts`);
        const found = res.data.find((p) => p._id === id);
        setPost(found);

        // Fetch book cover
        if (found) {
          const query = `${found.title} ${found.author}`;
          const coverRes = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
          );

          const data = await coverRes.json();

          if (data.docs.length > 0 && data.docs[0].cover_i) {
            setCover(
              `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
            );
          }
        }
      } catch {
        console.log("Error loading post");
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-emerald-600 mb-2">
            {post.title}
          </h1>

          <p className="text-gray-500 mb-4">{post.author}</p>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          <div className="mt-4 text-yellow-500 text-lg">
            {"⭐".repeat(post.rating)}
          </div>
        </div>

        {/* RIGHT SIDE COVER */}
        <div className="flex justify-center items-start">
          {cover && (
            <img
              src={cover}
              alt="Book Cover"
              className="rounded-xl shadow-md max-h-[400px]"
            />
          )}
        </div>

      </div>
    </Layout>
  );
}

export default ReadMore;
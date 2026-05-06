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
          } else {
            setCover(`/images/default-cover-page.png`);
          }
        }

      } catch {
        console.log("Error loading post");
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Layout>
        <div className="skeleton h-96 rounded-3xl" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="
        grid
        grid-cols-1
        lg:grid-cols-[1fr_340px]
        gap-10
      ">

        {/* CONTENT */}
        <div className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-8
        ">

          <h1 className="
            text-5xl
            font-extrabold
            text-slate-800
            leading-tight
          ">
            {post.title}
          </h1>

          <p className="
            text-xl
            text-gray-500
            mt-4
          ">
            {post.author}
          </p>

          <div className="
            mt-6
            text-yellow-500
            text-lg
          ">
            {"⭐".repeat(post.rating)}
          </div>

          <div className="
            mt-8
            text-gray-700
            leading-9
            whitespace-pre-line
            text-[17px]
          ">
            {post.content}
          </div>
        </div>

        {/* COVER */}
        <div className="
          sticky
          top-24
          h-fit
        ">
          <div className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          ">
            <img
              src={cover}
              alt="Book Cover"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReadMore;
import API from "../api";
import { useNavigate } from "react-router-dom";

function PostCard({ post, setPosts, user }) {
  const navigate = useNavigate();

  return (
    <div className="
      group
      bg-white/90
      backdrop-blur
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300
      p-6
      w-full
      max-w-2xl
    ">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <h2 className="
            text-2xl
            font-bold
            text-slate-800
            line-clamp-2
            leading-snug
          ">
            {post.title}
          </h2>

          <p className="
            text-sm
            text-gray-500
            mt-2
            line-clamp-1
          ">
            {post.author}
          </p>
        </div>

        {/* RATING */}
        <div className="
          text-yellow-500
          text-sm
          whitespace-nowrap
          font-medium
        ">
          {"⭐".repeat(post.rating)}
        </div>
      </div>

      {/* CONTENT */}
      <p className="
        mt-5
        text-gray-700
        leading-8
        line-clamp-6
        text-[15px]
      ">
        {post.content}
      </p>

      {/* FOOTER */}
      <div className="
        mt-6
        flex
        items-center
        justify-between
        border-t
        border-gray-100
        pt-4
      ">

        {/* LIKE */}
        <button
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");

              const res = await API.put(
                `/posts/like/${post._id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              setPosts((prev) =>
                prev.map((p) =>
                  p._id === post._id ? res.data : p
                )
              );
            } catch {
              alert("Error liking post");
            }
          }}
          className={`
            transition
            font-medium
            ${
              Array.isArray(post.likes) &&
              user &&
              post.likes.some((id) => id === user.id)
                ? "text-red-500"
                : "text-emerald-600 hover:text-emerald-700"
            }
          `}
        >
          ❤️ {Array.isArray(post.likes) ? post.likes.length : 0}
        </button>

        {/* READ MORE */}
        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="
            text-sm
            font-semibold
            text-blue-500
            hover:text-blue-600
            transition
          "
        >
          Read More →
        </button>
      </div>
    </div>
  );
}

export default PostCard;
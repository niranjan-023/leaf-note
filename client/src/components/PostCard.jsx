import API from "../api";
import { useNavigate } from "react-router-dom";

function PostCard({ post, posts, setPosts, user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition w-full max-w-2xl">
      
      <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
        {post.title}
      </h2>

      <p className="text-gray-500 text-sm mt-1 line-clamp-1">
        {post.author}
      </p>

      {/* Increased content lines */}
      <p className="text-gray-600 mt-3 line-clamp-6 leading-relaxed">
        {post.content}
      </p>

      <div className="mt-3 text-yellow-500">
        {"⭐".repeat(post.rating)}
      </div>

      <div className="flex justify-between items-center mt-4">
        
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
          className={`${
            Array.isArray(post.likes) &&
            user &&
            post.likes.some((id) => id === user.id)
              ? "text-red-500"
              : "text-emerald-600"
          } hover:underline`}
        >
          ❤️ {Array.isArray(post.likes) ? post.likes.length : 0}
        </button>

        {/* READ MORE */}
        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="text-blue-500 hover:underline"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default PostCard;
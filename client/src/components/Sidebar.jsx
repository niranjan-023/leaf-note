import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      
      <button
        onClick={() => navigate("/new-post")}
        className="bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
      >
        + New Post
      </button>

      <button
        onClick={() => navigate("/view-posts")}
        className="bg-white border py-3 rounded-xl hover:bg-gray-50 transition"
      >
        My Posts
      </button>

      {/* NEW BUTTON */}
      <button
        onClick={() => navigate("/books")}
        className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl hover:opacity-90 transition"
      >
        Explore Books
      </button>
    </div>
  );
}

export default Sidebar;
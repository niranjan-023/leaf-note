import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-24 h-fit flex flex-col gap-4">

      <button
        onClick={() => navigate("/new-post")}
        className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl shadow-md hover:shadow-lg transition font-semibold"
      >
        + New Post
      </button>

      <button
        onClick={() => navigate("/view-posts")}
        className="bg-white border border-gray-200 hover:border-emerald-300 py-3 rounded-2xl shadow-sm hover:shadow-md transition font-medium"
      >
        My Posts
      </button>

      <button
        onClick={() => navigate("/books")}
        className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-2xl shadow-md hover:scale-[1.02] transition font-semibold"
      >
        Explore Books
      </button>

    </div>
  );
}

export default Sidebar;
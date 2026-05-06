import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const [cover, setCover] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const query = `${book.title} ${book.author}`;

        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        if (data.docs?.length > 0 && data.docs[0].cover_i) {
          setCover(
            `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`
          );
        }
      } catch {
        console.log("Cover fetch failed");
      }
    };

    fetchCover();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      
      {/* COVER */}
      <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
        <img
          src={cover || "/images/default-cover-page.png"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        
        <h2 className="font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
          {book.author}
        </p>

        {/* Stats */}
        <div className="mt-3 space-y-1 text-sm">
          <p className="text-yellow-500">
            ⭐ {book.avgRating}
          </p>

          <p className="text-emerald-600">
            ❤️ {book.totalLikes}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() =>
            navigate(
              `/book-posts/${encodeURIComponent(book.normalizedTitle)}/${encodeURIComponent(book.normalizedAuthor)}`
            )
          }
          className="mt-4 bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          View Posts
        </button>
      </div>
    </div>
  );
}

export default BookCard;
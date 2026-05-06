import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, []);

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-gray-100
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        flex
        flex-col
      "
    >
      {/* COVER */}
      <div
        className="
          relative
          aspect-[2/2.7]
          bg-gray-100
          overflow-hidden
        "
      >
        {loading && (
          <div className="absolute inset-0 skeleton" />
        )}

        <img
          src={cover || "/images/default-cover-page.png"}
          alt={book.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-[1.03]
            transition
            duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">

        {/* TITLE */}
        <h2
          className="
            text-[17px]
            font-bold
            text-slate-800
            leading-snug
            line-clamp-2
            min-h-[3rem]
          "
        >
          {book.title}
        </h2>

        {/* AUTHOR */}
        <p
          className="
            text-sm
            text-gray-500
            mt-1.5
            line-clamp-1
          "
        >
          {book.author}
        </p>

        {/* STATS */}
        <div
          className="
            flex
            items-center
            justify-between
            mt-4
            text-sm
          "
        >
          <div className="text-yellow-500 font-semibold">
            ⭐ {book.avgRating}
          </div>

          <div className="text-emerald-600 font-medium">
            ❤️ {book.totalLikes}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            navigate(
              `/book-posts/${encodeURIComponent(book.normalizedTitle)}/${encodeURIComponent(book.normalizedAuthor)}`
            )
          }
          className="
            mt-4
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            py-2.5
            rounded-2xl
            transition
            font-semibold
            shadow-sm
            hover:shadow-md
            text-sm
          "
        >
          View Posts
        </button>
      </div>
    </div>
  );
}

export default BookCard;
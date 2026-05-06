import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import BookCard from "../components/BookCard";
import SortDropdown from "../components/SortDropdown";

function Books() {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("relevant");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {
        console.log("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const sortedBooks = [...books].sort((a, b) => {

    if (sort === "relevant") {
      return (
        (b.avgRating + b.totalLikes) -
        (a.avgRating + a.totalLikes)
      );
    }

    if (sort === "rating") return b.avgRating - a.avgRating;
    if (sort === "likes") return b.totalLikes - a.totalLikes;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "author") return a.author.localeCompare(b.author);

    return 0;
  });

  return (
    <Layout>

      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          justify-between
          items-start
          lg:items-center
          gap-5
          mb-12
        "
      >
        <div>
          <h1
            className="
              text-4xl
              md:text-5xl
              font-extrabold
              tracking-tight
              text-slate-800
            "
          >
            Explore Books
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-lg
              max-w-2xl
              leading-8
            "
          >
            Discover books loved, discussed, and reviewed
            by the LeafNote community.
          </p>
        </div>

        <SortDropdown
          value={sort}
          onChange={setSort}
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="
                skeleton
                h-[420px]
                rounded-3xl
              "
            />
          ))}
        </div>
      ) : (
        <>
          {/* EMPTY */}
          {sortedBooks.length === 0 ? (
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
                No books available 📚
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Create posts to populate the library.
              </p>
            </div>
          ) : (

            /* GRID */
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
                gap-6
              "
            >
              {sortedBooks.map((book) => (
                <BookCard
                  key={`${book.normalizedTitle}-${book.normalizedAuthor}`}
                  book={book}
                />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default Books;
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import BookCard from "../components/BookCard";
import SortDropdown from "../components/SortDropdown";

function Books() {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch {
        console.log("Error fetching books");
      }
    };

    fetchBooks();
  }, []);

  // SORTING
  const sortedBooks = [...books].sort((a, b) => {
    
    if (sort === "relevant") {
      return (
        (b.avgRating + b.totalLikes) -
        (a.avgRating + a.totalLikes)
      );
    }

    if (sort === "rating") {
      return b.avgRating - a.avgRating;
    }

    if (sort === "likes") {
      return b.totalLikes - a.totalLikes;
    }

    if (sort === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "author") {
      return a.author.localeCompare(b.author);
    }

    return 0;
  });

  return (
    <Layout>
      
      {/* TOP BAR */}
      <div className="flex justify-end mb-6">
        <SortDropdown
          value={sort}
          onChange={setSort}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {sortedBooks.map((book) => (
          <BookCard
            key={`${book.normalizedTitle}-${book.normalizedAuthor}`}
            book={book}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Books;
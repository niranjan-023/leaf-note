import { useEffect, useState } from "react";

function BookSidebar({ title, author }) {
  const [cover, setCover] = useState("");

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const query = `${title} ${author}`;

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
        console.log("Error fetching cover");
      }
    };

    fetchCover();
  }, [title, author]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
      
      <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {author}
      </p>

      <div className="mt-6 overflow-hidden rounded-xl">
        <img
          src={cover || "/images/default-cover-page.png"}
          alt={title}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}

export default BookSidebar;
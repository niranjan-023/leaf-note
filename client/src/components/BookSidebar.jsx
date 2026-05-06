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
    <div className="
      sticky
      top-24
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      p-6
      h-fit
    ">

      <h2 className="
        text-3xl
        font-bold
        text-slate-800
        leading-tight
      ">
        {title}
      </h2>

      <p className="
        text-gray-500
        mt-3
        text-lg
      ">
        {author}
      </p>

      <div className="
        mt-6
        overflow-hidden
        rounded-2xl
        shadow-md
      ">
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
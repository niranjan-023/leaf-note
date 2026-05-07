import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data);

      } catch {
        console.log("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === "likes") return b.likes.length - a.likes.length;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "author") return a.author.localeCompare(b.author);

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <Layout>

      {/* HEADER */}
      <div className="
        flex
        flex-col
        sm:flex-row
        justify-between
        items-start
        sm:items-center
        gap-4
        mb-10
      ">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">
            My Posts
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and organize your discussions.
          </p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            px-5
            py-3
            shadow-sm
          "
        >
          <option value="latest">Latest</option>
          <option value="likes">Most Liked</option>
          <option value="rating">Highest Rated</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="skeleton h-72 rounded-3xl"
            />
          ))}
        </div>
      ) : (
        <>
          {/* EMPTY */}
          {sortedPosts.length === 0 ? (
            <div className="
              bg-white
              rounded-3xl
              p-12
              text-center
              shadow-sm
              border
              border-gray-100
            ">
              <h2 className="text-2xl font-bold text-gray-700">
                No posts created yet ✍️
              </h2>

              <p className="text-gray-500 mt-3">
                Start sharing your reading experience.
              </p>
            </div>
          ) : (

            /* POSTS */
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            ">
              {sortedPosts.map((post) => (
                <div
                  key={post._id}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    transition
                    p-6
                  "
                >

                  <h2 className="
                    text-xl
                    font-bold
                    line-clamp-2
                    text-slate-800
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

                  <p className="
                    text-gray-700
                    mt-4
                    line-clamp-4
                    leading-7
                  ">
                    {post.content}
                  </p>

                  <div className="mt-4 text-yellow-500">
                    {"⭐".repeat(post.rating)}
                  </div>

                  {/* ACTIONS */}
                  <div className="
                    flex
                    justify-between
                    items-center
                    mt-6
                    border-t
                    border-gray-100
                    pt-4
                  ">

                    <span className="text-pink-500 font-medium">
                      Likes: {post.likes.length}❤️
                    </span>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          navigate(`/edit-post/${post._id}`)
                        }
                        className="
                          text-blue-500
                          hover:text-blue-600
                          font-medium
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (!confirm("Delete this post?")) return;

                          try {
                            const token = localStorage.getItem("token");

                            await API.delete(`/posts/${post._id}`, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            });

                            setPosts((prev) =>
                              prev.filter((p) => p._id !== post._id)
                            );

                          } catch {
                            alert("Error deleting post");
                          }
                        }}
                        className="
                          text-red-500
                          hover:text-red-600
                          font-medium
                        "
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default ViewPosts;
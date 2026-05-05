import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await API.get("/posts");
				setPosts(res.data);
			} catch {
				console.log("Error fetching posts");
			}
		};

		fetchPosts();
	}, []);

	const user = JSON.parse(localStorage.getItem("user") || "null");

	return (
		<Layout>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

				{/* FEED */}
				<div className="lg:col-span-2 flex flex-col gap-6">
					{posts.map((post) => (
						<div key={post._id} className="bg-white p-5 rounded-xl shadow-sm">

							<h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
								{post.title}
							</h2>

							<p className="text-gray-500 text-sm mt-1 line-clamp-1">
								{post.author}
							</p>

							<p className="text-gray-600 mt-3 line-clamp-3">
								{post.content}
							</p>

							{/* Rating */}
							<div className="mt-3 text-yellow-500">
								{"⭐".repeat(post.rating)}
							</div>

							{/* Footer */}
							<div className="flex justify-between items-center mt-4">
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
									className={`${Array.isArray(post.likes) &&
											user &&
											post.likes.some((id) => id === user.id)
											? "text-red-500"
											: "text-emerald-600"
										} hover:underline`}
								>
									❤️ {Array.isArray(post.likes) ? post.likes.length : 0}
								</button>

								<button
									onClick={() => navigate(`/post/${post._id}`)}
									className="text-blue-500 hover:underline"
								>
									Read More
								</button>
							</div>

						</div>
					))}
				</div>

				{/* SIDEBAR */}
				<div className="flex flex-col gap-4">
					<button
						onClick={() => navigate("/new-post")}
						className="bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600"
					>
						+ New Post
					</button>

					<button
						onClick={() => navigate("/view-posts")}
						className="bg-white border py-3 rounded-xl hover:bg-gray-50"
					>
						View Posts
					</button>
				</div>

			</div>
		</Layout>
	);
}

export default Home;
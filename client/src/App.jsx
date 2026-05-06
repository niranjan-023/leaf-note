import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPost from "./pages/NewPost";
import ReadMore from "./pages/ReadMore";
import ViewPosts from "./pages/ViewPosts";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import PublicRoute from "./components/PublicRoute";
import Books from "./pages/Books";
import BookPosts from "./pages/BookPosts";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<Layout showAuthButtons={true}>
							<div className="text-center mt-20">
								<h1 className="text-5xl font-semibold text-emerald-600 mb-4">
									Welcome to LeafNote 🌿
								</h1>
								<p className="text-gray-600 text-lg">
									Share your thoughts on books and explore others' insights.
								</p>
							</div>
						</Layout>
					</PublicRoute>
				}
			/>

			<Route
				path="/login"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>

			<Route
				path="/signup"
				element={
					<PublicRoute>
						<Signup />
					</PublicRoute>
				}
			/>

			<Route
				path="/home"
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/new-post"
				element={
					<ProtectedRoute>
						<NewPost />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/post/:id"
				element={
					<ProtectedRoute>
						<ReadMore />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/view-posts"
				element={
					<ProtectedRoute>
						<ViewPosts />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/edit-post/:id"
				element={
					<ProtectedRoute>
						<EditPost />
					</ProtectedRoute>
				}
			/>


			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/books"
				element={
					<ProtectedRoute>
						<Books />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/book-posts/:title/:author"
				element={
					<ProtectedRoute>
						<BookPosts />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
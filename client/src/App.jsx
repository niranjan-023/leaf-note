import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPost from "./pages/NewPost";
import ReadMore from "./pages/ReadMore";
import ViewPosts from "./pages/ViewPosts";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
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
				}
			/>

			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
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
		</Routes>
	);
}

export default App;
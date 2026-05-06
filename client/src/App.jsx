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
import { Link } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<Layout showAuthButtons={true}>
							<div className="
    min-h-[75vh]
    flex
    flex-col
    items-center
    justify-center
    text-center
  ">

								<div className="
      w-24
      h-24
      rounded-3xl
      bg-white
      shadow-xl
      flex
      items-center
      justify-center
      mb-8
      border
      border-gray-100
    ">
									<img
										src="/images/logo.png"
										alt="LeafNote"
										className="w-16 h-16 object-contain"
									/>
								</div>

								<h1 className="
      text-6xl
      font-extrabold
      tracking-tight
      text-slate-800
      leading-tight
    ">
									Welcome to{" "}
									<span className="text-emerald-600">
										LeafNote
									</span>
								</h1>

								<p className="
      text-gray-500
      text-xl
      mt-6
      max-w-2xl
      leading-8
    ">
									Share book discussions, discover new reads,
									and explore thoughts from a passionate reading community.
								</p>

								<div className="
      flex
      flex-col
      sm:flex-row
      gap-4
      mt-10
    ">

									<Link
										to="/signup"
										className="
          bg-emerald-500
          hover:bg-emerald-600
          text-white
          px-8
          py-4
          rounded-2xl
          font-semibold
          shadow-lg
          transition
        "
									>
										Get Started
									</Link>

									<Link
										to="/login"
										className="
          bg-white
          hover:bg-gray-50
          border
          border-gray-200
          px-8
          py-4
          rounded-2xl
          font-semibold
          transition
        "
									>
										Login
									</Link>
								</div>
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
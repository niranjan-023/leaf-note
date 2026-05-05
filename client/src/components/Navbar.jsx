import { Link } from "react-router-dom";

function Navbar({ showAuthButtons = false }) {
	const token = localStorage.getItem("token");
	return (
		<nav className="w-full bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

				{/* Logo */}
				<Link to="/" className="text-2xl font-semibold text-emerald-600">
					LeafNote 🌿
				</Link>

				{/* Right Side */}
				<div className="flex items-center gap-4">
					{token ? (
						<Link
							to="/profile"
							className="text-gray-600 hover:text-emerald-600 transition"
						>
							Profile
						</Link>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/signup">Sign Up</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
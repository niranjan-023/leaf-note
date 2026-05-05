import { Link } from "react-router-dom";

function Navbar({ showAuthButtons = false }) {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-emerald-600">
          LeafNote 🌿
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {showAuthButtons ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-emerald-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="text-gray-600 hover:text-emerald-600 transition"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
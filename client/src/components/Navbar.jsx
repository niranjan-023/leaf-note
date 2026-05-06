import { Link, useLocation } from "react-router-dom";

function Navbar({ showAuthButtons = false }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const navLinkClass = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-emerald-600"
        : "text-gray-600 hover:text-emerald-600"
    }`;

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LEFT SIDE — LOGO + NAME */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          {/* LOGO */}
          <img
            src="/images/logo.png"
            alt="LeafNote Logo"
            className="w-11 h-11 object-contain transition group-hover:scale-105"
          />

          {/* BRAND NAME */}
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold tracking-tight text-slate-800">
              Leaf<span className="text-emerald-600">Note</span>
            </span>

            <span className="text-[11px] text-gray-400 tracking-wide uppercase">
              Book Community
            </span>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5 text-[15px]">

          {token ? (
            <>
              <Link
                to="/home"
                className={navLinkClass("/home")}
              >
                Home
              </Link>

              <Link
                to="/books"
                className={navLinkClass("/books")}
              >
                Explore
              </Link>

              <Link
                to="/view-posts"
                className={navLinkClass("/view-posts")}
              >
                My Posts
              </Link>

              <Link
                to="/profile"
                className={navLinkClass("/profile")}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-emerald-600 transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition font-medium shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
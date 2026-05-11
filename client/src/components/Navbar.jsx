import { Link, useLocation } from "react-router-dom";
import { useState} from "react";

function Navbar() {
  const token = localStorage.getItem("token");

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);


  const navLinkClass = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-emerald-600"
        : "text-gray-600 hover:text-emerald-600"
    }`;

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white/90
        backdrop-blur-lg
        border-b
        border-gray-200
        shadow-sm
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* LEFT */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="LeafNote Home"
          >
            <img
              src="/images/logo.png"
              alt="LeafNote Logo"
              loading="eager"
              className="
                w-11
                h-11
                object-contain
                transition
                duration-300
                group-hover:scale-105
              "
            />

            <div className="leading-tight">
              <h1 className="
                text-2xl
                font-extrabold
                tracking-tight
                text-slate-800
              ">
                Leaf<span className="text-emerald-600">Note</span>
              </h1>

              <p className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-gray-400
              ">
                Book Community
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="
            hidden
            md:flex
            items-center
            gap-6
            text-[15px]
          ">

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
                  className="
                    text-gray-600
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="
                    bg-emerald-500
                    hover:bg-emerald-600
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    transition
                    shadow-sm
                    hover:shadow-md
                    font-medium
                  "
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            className="
              md:hidden
              text-3xl
              text-gray-700
              transition
              hover:text-emerald-600
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="
              md:hidden
              pb-5
              pt-4
              flex
              flex-col
              gap-3
              animate-fade-in
              border-t
              border-gray-100
            "
          >

            {token ? (
              <>
                <Link
                  to="/home"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-gray-700
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  Home
                </Link>

                <Link
                  to="/books"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-gray-700
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  Explore
                </Link>

                <Link
                  to="/view-posts"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-gray-700
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  My Posts
                </Link>

                <Link
                  to="/profile"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-gray-700
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-gray-700
                    hover:text-emerald-600
                    transition
                    font-medium
                  "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
				  onClick={() => setMenuOpen(false)}
                  className="
                    py-2
                    text-emerald-600
                    font-semibold
                  "
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
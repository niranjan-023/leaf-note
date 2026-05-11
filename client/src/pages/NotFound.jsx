import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="
      min-h-screen
      bg-slate-50
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        text-center
        max-w-xl
      ">

        {/* LOGO */}
        <div className="
          w-24
          h-24
          mx-auto
          rounded-3xl
          bg-white
          shadow-lg
          flex
          items-center
          justify-center
          border
          border-gray-100
          mb-8
        ">
          <img
            src="/images/logo.png"
            alt="LeafNote"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* 404 */}
        <h1 className="
          text-7xl
          font-extrabold
          text-emerald-600
          tracking-tight
        ">
          404
        </h1>

        <h2 className="
          text-3xl
          font-bold
          text-slate-800
          mt-4
        ">
          Page Not Found
        </h2>

        <p className="
          text-gray-500
          mt-4
          text-lg
          leading-8
        ">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        {/* BUTTONS */}
        <div className="
          flex
          flex-col
          sm:flex-row
          gap-4
          justify-center
          mt-10
        ">

          <Link
            to="/"
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
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
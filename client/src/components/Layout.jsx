import Navbar from "./Navbar";

function Layout({ children, showAuthButtons = false }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex flex-col text-gray-800">

      {/* NAVBAR */}
      <Navbar showAuthButtons={showAuthButtons} />

      {/* MAIN */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-white/95 backdrop-blur border-t border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LeafNote · Built for readers & thinkers.
          </p>

        </div>
      </footer>
    </div>
  );
}

export default Layout;
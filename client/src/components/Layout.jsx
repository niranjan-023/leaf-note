import Navbar from "./Navbar";

function Layout({ children, showAuthButtons = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <Navbar showAuthButtons={showAuthButtons} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} LeafNote. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
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
    </Routes>
  );
}

export default App;
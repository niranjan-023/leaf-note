import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FEED */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Dummy Post Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
              Atomic Habits: Building Better Habits
            </h2>
            <p className="text-gray-500 text-sm mt-1 line-clamp-1">
              James Clear
            </p>

            <p className="text-gray-600 mt-3 line-clamp-3">
              This book completely changed how I approach daily habits...
            </p>

            <div className="mt-3 text-yellow-500">⭐⭐⭐⭐⭐</div>

            <div className="flex justify-between items-center mt-4">
              <button className="text-emerald-600 hover:underline">
                ❤️ 12
              </button>
              <button className="text-blue-500 hover:underline">
                Read More
              </button>
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-4">
          <button className="bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition">
            + New Post
          </button>

          <button className="bg-white border py-3 rounded-xl hover:bg-gray-50 transition">
            View Posts
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default Home;
import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";



function Signup() {
	const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();

	try {
		await API.post("/auth/signup", form);
		alert("Signup successful");

		navigate("/login");
	} catch (error) {
		alert(error.response?.data?.message || "Signup failed");
	}
   };

  return (
    <Layout showAuthButtons={true}>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-center text-emerald-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <button
            type="submit"
            className="bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Signup;
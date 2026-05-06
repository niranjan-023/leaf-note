import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { clearAuth } from "../utils/auth";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      clearAuth();

      await API.post("/auth/signup", form);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Layout showAuthButtons={true}>
      <div className="
        max-w-md
        mx-auto
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-8
        mt-10
      ">

        <div className="text-center mb-8">

          <h1 className="
            text-4xl
            font-extrabold
            text-slate-800
          ">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join the LeafNote community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              border
              border-gray-200
              p-4
              rounded-2xl
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-400
            "
            required
          />

          <button
            type="submit"
            className="
              bg-emerald-500
              hover:bg-emerald-600
              text-white
              py-4
              rounded-2xl
              transition
              font-semibold
              shadow-md
            "
          >
            Create Account
          </button>
        </form>

        <p className="
          text-center
          text-sm
          text-gray-500
          mt-6
        ">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default Signup;
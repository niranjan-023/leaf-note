import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { clearAuth } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [checking, setChecking] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
		setChecking(true);
      clearAuth();

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));setChecking(false);
      navigate("/home");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setChecking(false);
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
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Continue your reading journey.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

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
              transition
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
              transition
            "
            required
          />

          <button
            type="submit"
			disabled={checking}
            className="
              bg-emerald-500
              hover:bg-emerald-600
			  disabled:bg-gray-400
              text-white
              py-4
              rounded-2xl
              transition
              font-semibold
              shadow-md
            "
          >
			{checking ? "Please Wait.." : "Login"}
          </button>
        </form>

        <p className="
          text-center
          text-sm
          text-gray-500
          mt-6
        ">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-emerald-600 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default Login;
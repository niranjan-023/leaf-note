import Layout from "../components/Layout";
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

function Login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Clear old session first
			clearAuth();

			const res = await API.post("/auth/login", form);

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));

			alert("Login successful");

			navigate("/home");
		} catch (error) {
			alert(error.response?.data?.message || "Login failed");
		}
	};

	return (
		<Layout showAuthButtons={true}>
			<div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
				<h2 className="text-2xl font-semibold text-center text-emerald-600 mb-6">
					Welcome Back
				</h2>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
						Login
					</button>
				</form>
			</div>
		</Layout>
	);
}

export default Login;
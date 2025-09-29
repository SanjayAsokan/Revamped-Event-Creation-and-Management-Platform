import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      const { _id, name, email, role, token } = res.data;

      localStorage.setItem("user", JSON.stringify({ _id, name, email, role }));
      localStorage.setItem("token", token);

      navigate("/login");
    } catch (err) {
      console.log("Register error:", err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="w-full max-w-md p-10 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="p-4 rounded-xl bg-gray-700/70 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
            className="p-4 rounded-xl bg-gray-700/70 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="p-4 rounded-xl bg-gray-700/70 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-700/70 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white text-lg transition shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

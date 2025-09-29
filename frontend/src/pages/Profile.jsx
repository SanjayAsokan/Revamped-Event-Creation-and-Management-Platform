import { useState, useEffect } from "react";
import UserLayout from "@/layouts/UserLayout";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email });
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update profile", form);
    // Implement API call to update user profile here
  };

  if (!user) return <p className="text-center mt-10">Not logged in.</p>;

  return (
    <UserLayout>
      <div className="px-8 py-10 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 py-3 rounded hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </UserLayout>
  );
}

"use client";

import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed");
        return;
      }

      setSuccess("User registered successfully");
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-lg font-bold text-black">Crypto Dashboard</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-black hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/news" className="text-black hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                Alerts
              </a>
            </li>
            <li>
              <a href="/signup" className="text-black hover:underline">
                SignUp
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Signup Form Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Returning User? */}
        <div className="text-center mt-4">
          <p className="text-black">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

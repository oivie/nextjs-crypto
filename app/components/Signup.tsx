"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-white">Join the Crypto Revolution!</h1>
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-green-400">{success}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white p-3 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-white">
            Already a member?{" "}
            <a href="/login" className="text-yellow-400 hover:underline">
              Log in here
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-white">Why Join Us?</h2>
          <ul className="text-white mt-2">
            <li>💰 Trade a variety of cryptocurrencies</li>
            <li>🔒 Secure your assets with top-notch security</li>
            <li>🚀 Get started with an exclusive welcome bonus</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

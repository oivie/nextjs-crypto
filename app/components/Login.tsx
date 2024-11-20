// app/components/Login.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter(); // Use the Next.js router

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful");
        setError("");
        localStorage.setItem("username", email);  // Store the username or any other user data

        // Redirect to the portfolio page
        router.push("/portfolio");
      } else {
        setError(data.error || "Login failed");
        setSuccess("");
      }
    } catch {
      setError("Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-white">Login to Crypto Board</h1>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          {/* Display error or success message inside the form */}
          {error && (
            <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded-lg">
              {success}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white p-3 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-white">
            Do not have an account?{" "}
            <a href="/signup" className="text-yellow-400 hover:underline">
              Sign up here
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

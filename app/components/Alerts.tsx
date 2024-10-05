"use client"; // For Next.js client-side rendering

import { useState, useEffect } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"); // CoinGecko API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch alerts.");
        }
        const data = await response.json(); // Assuming the API returns JSON
        setAlerts(data); // Set the alerts data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-black">Loading alerts...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-black">Error: {error}</h1>
        </div>
      </div>
    );
  }

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
              <a href="/portfolio" className="text-black hover:underline">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/news" className="text-black hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="/alerts" className="text-black hover:underline">
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

      {/* Alerts Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Latest Alerts</h1>

        {alerts.length === 0 ? (
          <p className="text-black">No alerts available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border p-4 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-black">Alert: {alert.type}</h2>
                <p className="text-black">{alert.message}</p>
                <p className="text-black">Date: {new Date(alert.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

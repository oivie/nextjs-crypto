"use client";

import { useEffect, useState } from "react";
import PriceChart from "./pages/components/PriceChart";

// Interface for the crypto data
interface Crypto {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  last_updated: string;
  image: string;
}

export default function Home() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cryptos"); // Fetch from your API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Crypto[] = await response.json();
        setCryptos(data); // Set the crypto data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-lg font-bold text-black">Crypto Dashboard</div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-black hover:underline">
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
          </ul>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrency Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {cryptos.map((crypto) => (
            <div key={crypto.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold text-black">{crypto.name}</h2>
              <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
              <p className="text-black">Price: ${crypto.current_price}</p>
              <p className="text-black">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="text-black">24h Change: {crypto.price_change_percentage_24h}%</p>
              <p className="text-black">Last updated: {new Date(crypto.last_updated).toLocaleString()}</p>
              <PriceChart coinId={crypto.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

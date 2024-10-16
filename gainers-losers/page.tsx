"use client";

import { useEffect, useState } from 'react';

// Define a TypeScript interface for the crypto data
interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function GainersLosers() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [gainers, setGainers] = useState<Crypto[]>([]);
  const [losers, setLosers] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cryptos"); // Fetch from your API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Crypto[] = await response.json();
        
        // Sort gainers and losers based on 24h change
        const sorted = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        
        // Top 5 gainers (highest 24h change)
        setGainers(sorted.slice(0, 5));
        
        // Top 5 losers (lowest 24h change)
        setLosers(sorted.slice(-5).reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-black">Top Gainers & Losers</h1>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top 5 Gainers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Top 5 Gainers</h2>
            <div className="grid grid-cols-1 gap-4">
              {gainers.map((crypto) => (
                <div key={crypto.id} className="border p-4 rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-bold text-black">{crypto.name}</h3>
                  <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
                  <p className="text-black">Price: ${crypto.current_price}</p>
                  <p className="text-black">24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Losers */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Top 5 Losers</h2>
            <div className="grid grid-cols-1 gap-4">
              {losers.map((crypto) => (
                <div key={crypto.id} className="border p-4 rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-bold text-black">{crypto.name}</h3>
                  <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
                  <p className="text-black">Price: ${crypto.current_price}</p>
                  <p className="text-black">24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

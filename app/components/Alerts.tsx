"use client";

import { useState, useEffect } from "react";

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

export default function CryptoList() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");

        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrency data.");
        }

        const data = await response.json();
        setCryptos(data); // Set the cryptocurrency data
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-black">Loading cryptocurrencies...</h1>
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrency Alerts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {cryptos.map((crypto) => (
            <div key={crypto.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold text-black">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
              <p className="text-black">Current Price: ${crypto.current_price.toLocaleString()}</p>
              <p className="text-black">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="text-black">Market Cap Rank: {crypto.market_cap_rank}</p>
              <p className={`text-black ${crypto.price_change_percentage_24h < 0 ? 'text-red-600' : 'text-green-600'}`}>
                24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

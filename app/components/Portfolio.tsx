'use client';

import { useEffect, useState } from "react";
import LineChart from "../pages/components/LineChart";

interface HistoricalData {
  date: string;
  price: number;
}

interface PortfolioItem {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  historicalData: HistoricalData[]; // Optional: if you're including historical data
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [userName, setUserName] = useState<string | null>(null); // State to store the username

  useEffect(() => {
    // Retrieve the stored portfolio data from localStorage
    const storedPortfolio = localStorage.getItem("portfolio");
    if (storedPortfolio) {
      const data: PortfolioItem[] = JSON.parse(storedPortfolio);
      setPortfolioItems(data); // Set the portfolio items in state
    }

    // Retrieve the logged-in user's name from localStorage
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Flex container for My Portfolio and Welcome username */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">My Portfolio</h1>
          <h2 className="text-2xl text-black">
            {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-2xl font-bold text-black">{item.name}</h2>
              <p className="text-black">Current Price: ${item.current_price}</p>
              <p className="text-black">
                Market Cap: ${item.market_cap.toLocaleString()}
              </p>
              <p className="text-black">
                24h Change: {item.price_change_percentage_24h}%
              </p>
              {/* If you have historical data */}
              <div className="mt-4">
                <LineChart
                  data={{
                    labels: item.historicalData?.map((entry) => entry.date) || [],
                    prices: item.historicalData?.map((entry) => entry.price) || [],
                  }}
                  label={`Price History for ${item.name}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

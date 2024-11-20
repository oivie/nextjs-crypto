'use client';

import { useEffect, useState } from "react";
import LineChart from "../pages/components/LineChart";

// Define the types for portfolio items and historical data
interface HistoricalData {
  date: string;
  price: number;
}

interface PortfolioItem {
  id: string;
  name: string;
  currentPrice: number;
  historicalData: HistoricalData[];
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [userName, setUserName] = useState<string | null>(null); // State to store the username

  useEffect(() => {
    // Retrieve the stored portfolio data
    const storedPortfolio = localStorage.getItem("portfolio");
    if (storedPortfolio) {
      const data: PortfolioItem[] = JSON.parse(storedPortfolio);
      setPortfolioItems(data);
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
          <h2 className="text-2xl text-black">{userName ? `Welcome, ${userName}` : "Welcome, Guest"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {portfolioItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold text-black">{item.name}</h2>
              <p className="text-black">Current Price: ${item.currentPrice}</p>
              <div className="mt-4">
                <LineChart historicalData={item.historicalData} coinId={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

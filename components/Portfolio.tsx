"use client";

import { useEffect, useState } from "react";
import LineChart from "../pages/components/LineChart";

// Define the types for portfolio items and historical data
interface HistoricalData {
  date: string;
  price: number;
}

interface PortfolioItem {
  id: string;
  currentPrice: number;
  historicalData: HistoricalData[];
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]); // Specify the type for portfolio items
  const coinIds = ["bitcoin", "ethereum"]; // Example coin IDs
  const timePeriod = "30"; // Example time period (in days)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`/api/portfolio?coinIds=${coinIds.join(",")}&timePeriod=${timePeriod}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        const data: PortfolioItem[] = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Portfolio Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">My Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {portfolioItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-2xl font-bold text-black">{item.id}</h2>
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

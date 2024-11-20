'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
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
  const router = useRouter(); // Initialize useRouter

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

  // Function to remove an item from the portfolio
  const removeFromPortfolio = (id: string) => {
    const updatedPortfolio = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio)); // Update local storage
  };

  // Navigate to the main page to add a new item
  const navigateToMainPage = () => {
    router.push("/"); // Adjust the route to the actual main page
  };

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

        {/* Add Item Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={navigateToMainPage}
            className="w-40 h-10 bg-green-500 text-white rounded-full hover:bg-green-700 active:scale-95 transition duration-300 ease-in-out transform hover:shadow-lg"
          >
            Add New Item
          </button>
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

              {/* Remove from Portfolio Button */}
              <button
                onClick={() => removeFromPortfolio(item.id)}
                className="w-32 h-8 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 active:scale-95 transition duration-300 ease-in-out transform hover:shadow-lg flex items-center justify-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

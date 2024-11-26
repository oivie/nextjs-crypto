'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LineChart from "../pages/components/LineChart";
import { exportToCSV } from "../utils/exportCsv";

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
  historicalData: HistoricalData[];
  favorite: boolean;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedPortfolio = localStorage.getItem("portfolio");
    if (storedPortfolio) {
      const data: PortfolioItem[] = JSON.parse(storedPortfolio);
      setPortfolioItems(data);
    }
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedPortfolio = portfolioItems.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    setPortfolioItems(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  const removeFromPortfolio = (id: string) => {
    const updatedPortfolio = portfolioItems.filter((item) => item.id !== id);
    setPortfolioItems(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  const navigateToMainPage = () => {
    router.push("/");
  };

  const displayedItems = showFavorites
    ? portfolioItems.filter((item) => item.favorite)
    : portfolioItems;

  const totalPortfolioValue = portfolioItems.reduce(
    (acc, item) => acc + item.current_price,
    0
  );

  const totalGrowth = portfolioItems.reduce(
    (acc, item) =>
      acc +
      (item.current_price * item.price_change_percentage_24h) / 100,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">My Portfolio</h1>
          <h2 className="text-2xl text-black">
            {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
          </h2>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-4 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 shadow-lg">
            <h3 className="text-white text-lg font-semibold">Total Portfolio Value</h3>
            <p className="text-2xl text-white font-bold">${totalPortfolioValue.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
            <h3 className="text-white text-lg font-semibold">Total Growth (24h)</h3>
            <p className="text-2xl text-white font-bold">
              ${totalGrowth.toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
            <h3 className="text-white text-lg font-semibold">Total Items</h3>
            <p className="text-2xl text-white font-bold">
              {portfolioItems.length}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mb-4">
          <button
            onClick={navigateToMainPage}
            className="w-40 h-10 bg-green-500 text-white rounded-full hover:bg-green-700"
          >
            Add New Item
          </button>
          <button
            onClick={() => exportToCSV(portfolioItems, "portfolio.csv")}
            className="w-40 h-10 bg-green-500 text-white rounded-full hover:bg-green-700"
          >
            Export to CSV
          </button>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`w-40 h-10 ${
              showFavorites ? "bg-yellow-700" : "bg-yellow-500"
            } text-white rounded-full`}
          >
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {displayedItems.map((item) => (
            <div
                key={item.id}
                className="relative border p-4 rounded-lg shadow-lg bg-white"
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full ${
                    item.favorite ? "bg-yellow-400" : "bg-gray-200"
                  } hover:bg-yellow-500 flex items-center justify-center`}
                  title="Toggle Favorite"
                >
                  {item.favorite ? "★" : "☆"}
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-black">{item.name}</h2>
                <p className="text-black">Current Price: ${item.current_price}</p>
                <p className="text-black">
                  Market Cap: ${item.market_cap.toLocaleString()}
                </p>
                <p className="text-black">
                  24h Change: {item.price_change_percentage_24h}%
                </p>
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

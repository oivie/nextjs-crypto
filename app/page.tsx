"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PriceChart from "./pages/components/PriceChart"; // Adjust the import path if necessary
import "./globals.css";
import LandingPage from "./components/LandingPage";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<
    "name" | "current_price" | "price_change_percentage_24h"
  >("name");
  const [selectedCryptos, setSelectedCryptos] = useState<Crypto[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success notification

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cryptos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Crypto[] = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to handle sorting
  const handleSortChange = (
    key: "name" | "current_price" | "price_change_percentage_24h"
  ) => {
    setSortKey(key);
    const sortedCryptos = [...cryptos].sort((a, b) => {
      if (key === "name") {
        return a.name.localeCompare(b.name);
      } else if (key === "current_price") {
        return b.current_price - a.current_price;
      } else {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });
    setCryptos(sortedCryptos);
  };

  // Function to handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to page 1 on search
  };

  // Filter cryptos by search term
  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm)
  );

  // Recalculate total pages based on filtered cryptos
  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage);

  // Get current cryptos to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCryptos = filteredCryptos.slice(indexOfFirstItem, indexOfLastItem);

  // Function to generate page numbers
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${
              currentPage === i ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${
            currentPage === 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="dots-left" className="mx-1 text-black">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${
              currentPage === i ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots-right" className="mx-1 text-black">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${
            currentPage === totalPages ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen relative bg-indigo-50">
      <LandingPage />

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Dashboard Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-bold mb-6 text-black leading-tight">
          Market Overview
        </h1>

        {/* Search Bar and Sort Options */}
        <div className="flex justify-between items-center mb-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 border rounded-lg text-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {/* Sort */}
          <div>
            <label className="mr-2 font-bold text-black">Sort by:</label>
            <select
              value={sortKey}
              onChange={(e) =>
                handleSortChange(
                  e.target.value as "name" | "current_price" | "price_change_percentage_24h"
                )
              }
              className="px-4 py-2 border rounded-lg text-black"
            >
              <option value="name">Name</option>
              <option value="current_price">Price</option>
              <option value="price_change_percentage_24h">Change (24h)</option>
            </select>
          </div>
        </div>

        {/* Crypto Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {currentCryptos.map((crypto) => (
            <div key={crypto.id} className="card">
              <h2 className="text-2xl font-bold text-black">{crypto.name}</h2>
              <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
              <p className="text-black">Price: ${crypto.current_price}</p>
              <p className="text-black">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="text-black">24h Change: {crypto.price_change_percentage_24h}%</p>
              <p className="text-black">
                Last updated: {new Date(crypto.last_updated).toLocaleString()}
              </p>
              <PriceChart coinId={crypto.id} />

              {/* Add to Portfolio Button */}
              <button
                onClick={() => {
                  setSelectedCryptos((prev) => {
                    // Prevent duplicates
                    if (prev.some((item) => item.id === crypto.id)) {
                      alert("This item is already in your portfolio.");
                      return prev;
                    }

                    // Add the full crypto object to the portfolio
                    const updatedList = [...prev, crypto];
                    localStorage.setItem("portfolio", JSON.stringify(updatedList));
                    setSuccessMessage(`${crypto.name} has been added to your portfolio!`);
                    setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
                    return updatedList;
                  });
                }}
                className="w-full h-10 mt-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 active:scale-95 transition duration-300 ease-in-out transform hover:shadow-lg flex items-center justify-center"
              >
                Add to Portfolio
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="flex">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`w-20 h-10 flex items-center justify-center px-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-90 transition-transform duration-300 ease-in-out"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">{renderPageNumbers()}</div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`w-20 h-10 flex items-center justify-center ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 px-2"
              } rounded-full mx-2`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

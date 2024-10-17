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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        
        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrency data.");
        }

        const data = await response.json();
        setCryptos(data);
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

  const totalPages = Math.ceil(cryptos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCryptos = cryptos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full text-center ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
        disabled={page === '...'}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Cryptocurrency Alerts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {currentCryptos.map((crypto) => (
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`w-20 h-10 flex items-center justify-center ${currentPage === 1 ? 'bg-gray-300' : 'bg-indigo-600 text-white'} rounded-full hover:bg-indigo-700`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex items-center">
            {renderPagination()}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`w-20 h-10 flex items-center justify-center ${currentPage === totalPages ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'} rounded-full mx-2`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

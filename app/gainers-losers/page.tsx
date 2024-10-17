"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function GainersLosers() {
  const [gainers, setGainers] = useState<Crypto[]>([]);
  const [losers, setLosers] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/cryptos");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Crypto[] = await response.json();
        
        const sorted = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setGainers(sorted.slice(0, 5));
        setLosers(sorted.slice(-5).reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const gainersData = {
    labels: gainers.map((crypto) => crypto.name),
    datasets: [
      {
        label: '24h % Change',
        data: gainers.map((crypto) => crypto.price_change_percentage_24h),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const losersData = {
    labels: losers.map((crypto) => crypto.name),
    datasets: [
      {
        label: '24h % Change',
        data: losers.map((crypto) => crypto.price_change_percentage_24h),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Crypto Gainers & Losers</h1>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Top 5 Gainers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Top 5 Gainers</h2>
          
          {/* Gainers Cards */}
          <div className="grid grid-cols-1 gap-4">
            {gainers.map((crypto) => (
              <div key={crypto.id} className="flex items-center border rounded-lg p-4 bg-white shadow-md space-x-4">
                <img src={crypto.image} alt={crypto.name} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{crypto.name}</h3>
                  <p className="text-sm text-gray-600">Price: ${crypto.current_price}</p>
                  <p className="text-sm text-green-600">24h Change: +{crypto.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gainers Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Bar data={gainersData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Top 5 Losers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Top 5 Losers</h2>
          
          {/* Losers Cards */}
          <div className="grid grid-cols-1 gap-4">
            {losers.map((crypto) => (
              <div key={crypto.id} className="flex items-center border rounded-lg p-4 bg-white shadow-md space-x-4">
                <img src={crypto.image} alt={crypto.name} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{crypto.name}</h3>
                  <p className="text-sm text-gray-600">Price: ${crypto.current_price}</p>
                  <p className="text-sm text-red-600">24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Losers Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Bar data={losersData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// Interface for the crypto data
interface Crypto {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface MarketData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number };
  };
}


export default function AnalyticsPage() {
  const [gainers, setGainers] = useState<Crypto[]>([]);
  const [losers, setLosers] = useState<Crypto[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [alerts, setAlerts] = useState<Crypto[]>([]);
  const [timeframe, setTimeframe] = useState('24h'); // Track selected timeframe
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetching cryptos data
        const response = await fetch('/api/cryptos');
        const data: Crypto[] = await response.json();

        // Sort by price change and slice top 5 gainers and losers
        const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setGainers(sortedData.slice(0, 5));
        setLosers(sortedData.slice(-5).reverse());

        // Fetch market overview data
        const marketResponse = await fetch('https://api.coingecko.com/api/v3/global');
        const marketData = await marketResponse.json();

        setMarketData(marketData); // Set the market data
        setAlerts(data.filter(crypto => Math.abs(crypto.price_change_percentage_24h) > 5)); // Set alerts

        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Mark loading as complete
      }
    }
    fetchData();
  }, []);


  // Ensure marketData is in the correct format for the bar chart
    const marketChartData = marketData
    ? {
        labels: ['Market Cap', 'Total Volume', 'BTC Dominance'],
        datasets: [
          {
            label: 'Market Overview',
            data: [
              marketData.data.total_market_cap.usd / 1e12, // Trillions
              marketData.data.total_volume.usd / 1e9, // Billions
              marketData.data.market_cap_percentage.btc, // BTC Dominance
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['#4F46E5', '#9B59B6', '#FF9800'],
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: [],
        datasets: [],
      }; // Empty structure

  // If loading, show a loading message
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header Section */}
      <div className="flex justify-around gap-4 mt-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold">Market Cap</h3>
          <p className="text-2xl font-bold">$2.5T</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold">24h Volume</h3>
          <p className="text-2xl font-bold">$120B</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold">Bitcoin Dominance</h3>
          <p className="text-2xl font-bold">45%</p>
        </div>
      </div>


{/* Top Gainers and Losers */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="section">
        <h2 className="text-lg font-bold mb-4">Top Gainers</h2>
        {gainers.map((crypto) => (
          <div key={crypto.id} className="card flex items-center">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
            <div className="ml-4">
              <h3 className="font-semibold">{crypto.name}</h3>
              <p>Price: ${crypto.current_price}</p>
              <p className="text-green-500">24h Change: +{crypto.price_change_percentage_24h}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="text-lg font-bold mb-4">Top Losers</h2>
        {losers.map((crypto) => (
          <div key={crypto.id} className="card flex items-center">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
            <div className="ml-4">
              <h3 className="font-semibold">{crypto.name}</h3>
              <p>Price: ${crypto.current_price}</p>
              <p className="text-red-500">24h Change: {crypto.price_change_percentage_24h}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Central Visualization */}
      <div className="mt-12">
        {/* Market Trends Section */}
        <div className="section">
            <h2 className="text-lg font-bold mb-4">Market Trends</h2>
            <div className="flex justify-between items-center mb-4">
              {/* Buttons for switching timeframes */}

              <button
                className={`px-4 py-2 rounded-lg ${
                  timeframe === '24h' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setTimeframe('24h')}
              >
                24h
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  timeframe === '7d' ? 'bg-indigo-500' : 'bg-indigo-300 hover:bg-indigo-400'
                }`}
                onClick={() => setTimeframe('7d')}
              >
                7d
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  timeframe === '1m' ? 'bg-indigo-500' : 'bg-indigo-300 hover:bg-indigo-400'
                }`}
                onClick={() => setTimeframe('1m')}
              >
                1m
              </button>
            </div>
            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {marketChartData ? (
                <Bar data={marketChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              ) : (
                <p className="text-center">Loading market data...</p>
              )}
            </div>
          </div>
      </div>

      {/* Alerts Section */}
      <div className="mt-12">
      <div className="real-time-alerts overflow-y-auto space-y-4 p-4 bg-gray-100 rounded-lg shadow">
          {alerts.map((crypto) => (
            <div key={crypto.id} className="card flex items-center shadow p-4 rounded-lg bg-white">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{crypto.name}</h3>
                <p className="text-sm text-gray-600">Price: ${crypto.current_price.toFixed(2)}</p>
                <p
                  className={`text-sm font-bold ${
                    crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

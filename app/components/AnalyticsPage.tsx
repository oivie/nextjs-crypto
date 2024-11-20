'use client'

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Interface for the crypto data
interface Crypto {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export default function AnalyticsPage() {
  const [gainers, setGainers] = useState<Crypto[]>([]);
  const [losers, setLosers] = useState<Crypto[]>([]);
  const [marketData, setMarketData] = useState<any>(null);
  const [alerts, setAlerts] = useState<Crypto[]>([]);
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

        console.log('Market data response:', marketData); // Debugging log

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

  // Ensure marketData is in the correct format for Chart.js
  const marketChartData = marketData
    ? {
        labels: ['Market Cap', 'Total Volume', 'Total Market Dominance'], // Labels for the chart
        datasets: [
          {
            label: 'Market Data (USD)',
            data: [
              marketData.data.total_market_cap.usd, // Total market cap
              marketData.data.total_volume.usd, // Total volume
              marketData.data.market_cap_percentage.btc, // Market dominance for Bitcoin (example)
            ],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['#4F46E5', '#9B59B6', '#FF9800'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  // If loading, show a loading message
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-8 px-4">
      <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 mb-10">
        Cryptocurrency Analytics
      </h1>

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Track Market Trends and Changes</h2>
        <p className="text-lg text-gray-600">Explore the latest market analytics, top gainers & losers, and key metrics for smarter decision-making.</p>
      </div>

      {/* Top Gainers and Losers */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Gainers</h2>
          <div className="space-y-4">
            {gainers.map((crypto) => (
              <div key={crypto.id} className="flex items-center p-4 border rounded-lg bg-white shadow-md">
                <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <p>Price: ${crypto.current_price}</p>
                  <p className="text-green-500">24h Change: +{crypto.price_change_percentage_24h}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Losers</h2>
          <div className="space-y-4">
            {losers.map((crypto) => (
              <div key={crypto.id} className="flex items-center p-4 border rounded-lg bg-white shadow-md">
                <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <p>Price: ${crypto.current_price}</p>
                  <p className="text-red-500">24h Change: {crypto.price_change_percentage_24h}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview with Bar Chart */}
      <div className="container mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Market Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {marketChartData ? (
            <Bar data={marketChartData} options={{ responsive: true }} />
          ) : (
            <p>No market data available</p>
          )}
        </div>
      </div>

      {/* Real-Time Alerts */}
      <div className="container mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Real-Time Alerts</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          {alerts.map((crypto) => (
            <div key={crypto.id} className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-md hover:bg-gray-100 transition-all">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-800">{crypto.name}</h3>
                <p className="text-sm text-gray-600">Price: ${crypto.current_price.toFixed(2)}</p>
                <p className={`text-sm font-bold ${crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              <div className={`p-2 rounded-full ${crypto.price_change_percentage_24h > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {crypto.price_change_percentage_24h > 0 ? '📈' : '📉'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

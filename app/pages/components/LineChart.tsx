import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the expected types for the props
interface LineChartProps {
  historicalData: {
    prices: [number, number][]; // Array of [timestamp, price]
  } | null; // historicalData could be null
  coinId: string; // coinId is a required string
}

const LineChart: React.FC<LineChartProps> = ({ historicalData, coinId }) => {
  // Check if historicalData and prices are valid before proceeding
  if (!historicalData || !historicalData.prices) {
    // Return a loading state or fallback if data is not ready
    return <p>Loading chart data...</p>;
  }

  // Map over the prices array to extract date labels and price data
  const labels = historicalData.prices.map((price) => new Date(price[0]).toLocaleDateString());
  const data = historicalData.prices.map((price) => price[1]);

  // ChartJS-compatible data object
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: coinId,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;

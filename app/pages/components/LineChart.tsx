import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  historicalData: {
    date: string;  
    price: number; 
  }[] | null;
  coinId: string; 
}

const LineChart: React.FC<LineChartProps> = ({ historicalData, coinId }) => {
  // Ensure historicalData is valid and has prices
  if (!historicalData || !Array.isArray(historicalData) || historicalData.length === 0) {
    return <p>Loading chart data...</p>;
  }

  const labels = historicalData.map((data) => new Date(data.date).toLocaleDateString());
  const prices = historicalData.map((data) => data.price);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: coinId,
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};
``

export default LineChart;

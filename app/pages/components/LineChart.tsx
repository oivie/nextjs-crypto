import { Line } from 'react-chartjs-2';
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



interface LineChartProps {
  data: {
    labels: string[];  // Labels (dates or custom labels)
    prices: number[];   // Corresponding prices or values (market cap, etc.)
  } | null;
  label: string;  // Label for the chart (e.g., 'Market Cap', 'BTC Price')
}





const LineChart: React.FC<LineChartProps> = ({ data, label }) => {
  // Ensure the data is valid
  if (!data || !Array.isArray(data.labels) || !Array.isArray(data.prices) || data.labels.length === 0) {
    return <p>Loading chart data...</p>;
  }

  const chartData = {
    labels: data.labels,  // X-axis labels (dates or custom)
    datasets: [
      {
        label,  // Chart label (passed as prop)
        data: data.prices,  // Y-axis data (prices or market cap values)
        borderColor: 'rgba(75, 192, 192, 1)',  // Styling
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

import { Line } from "react-chartjs-2";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
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
    labels: string[]; // X-axis labels (e.g., dates)
    prices: number[]; // Y-axis data (e.g., prices)
  } | null;
  label: string; // Label for the dataset (e.g., 'BTC Price')
}

const LineChart: React.FC<LineChartProps> = ({ data, label }) => {
  // Ensure the `data` prop is valid
  if (!data || data.labels.length === 0 || data.prices.length === 0) {
    return (
      <div className="flex items-center justify-center h-10">
        {/* <p className="text-gray-500">Loading chart data...</p> */}
      </div>
    );
  }

  // Chart.js data configuration
  const chartData = {
    labels: data.labels, // X-axis labels (e.g., dates)
    datasets: [
      {
        label, // Dataset label
        data: data.prices, // Y-axis data (e.g., prices)
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        fill: true, // Enable area fill
        tension: 0.4, // Smooth the line
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent fixed height/width
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14, // Adjust legend font size
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `$${tooltipItem.raw.toFixed(2)}`; // Format tooltip values as currency
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // X-axis grid line color
        },
        ticks: {
          font: {
            size: 12, // Adjust font size
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Y-axis grid line color
        },
        ticks: {
          callback: function (value: any) {
            return `$${value}`; // Format Y-axis ticks as currency
          },
          font: {
            size: 12, // Adjust font size
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;

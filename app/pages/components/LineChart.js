import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ historicalData, coinId }) => {
  const labels = historicalData.prices.map(price => new Date(price[0]).toLocaleDateString());
  const data = historicalData.prices.map(price => price[1]);

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

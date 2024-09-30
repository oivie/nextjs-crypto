import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const PriceChart = ({ coinId }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Price',
        data: [100, 200, 150, 300, 250, 400],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h3 className="text-black font-bold">Price Chart for {coinId}</h3>
      <Line data={data} />
    </div>
  );
};

export default PriceChart;

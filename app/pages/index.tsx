import { useEffect, useState } from 'react';
import PriceChart from './components/PriceChart';
import api from '../utils/api';

// Define the type for each cryptocurrency
interface Crypto {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export default function Home() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
          },
        });
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{crypto.name}</h2>
            <p>Price: ${crypto.current_price}</p>
            <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
            <p>24h Change: {crypto.price_change_percentage_24h}%</p>
            <PriceChart coinId={crypto.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

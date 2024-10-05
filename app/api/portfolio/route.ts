// app/api/portfolio/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const coinIds = searchParams.get('coinIds')?.split(',') || [];
    const timePeriod = searchParams.get('timePeriod') || '30'; // default to 30 days
  
    try {
      // Get current prices
      const prices = await getCurrentPrices(coinIds);
  
      // Get historical data for each coin based on the time period
      const historicalData = await Promise.all(coinIds.map(id => getMarketChart(id, timePeriod)));
  
      // Combine the current prices and historical data
      const portfolio = coinIds.map((id, index) => ({
        id,
        currentPrice: prices[id]?.usd,
        historicalData: historicalData[index],
      }));
  
      return new Response(JSON.stringify(portfolio), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to fetch portfolio data' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  
  async function getCurrentPrices(coinIds) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd`);
    if (!response.ok) throw new Error('Failed to fetch current prices');
    return await response.json();
  }
  
  async function getMarketChart(coinId, days) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
    if (!response.ok) throw new Error('Failed to fetch market chart data');
    return await response.json();
  }
  
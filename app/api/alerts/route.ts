import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from CoinGecko API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
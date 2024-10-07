import { NextResponse } from "next/server";

interface PriceResponse {
  [key: string]: {
    usd: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinIds = searchParams.get("coinIds")?.split(",") || [];
  const timePeriod = searchParams.get("timePeriod") || "30"; // default to 30 days

  try {
    const prices = await getCurrentPrices(coinIds);
    const historicalData = await Promise.all(
      coinIds.map(async (id) => {
        try {
          return await getMarketChart(id, timePeriod);
        } catch (error) {
          console.error(`Failed to fetch market chart for ${id}`, error);
          return null; // Return null if it fails
        }
      })
    );

    const portfolio = coinIds.map((id, index) => ({
      id,
      currentPrice: prices[id]?.usd,
      historicalData: historicalData[index],
    }));

    return new NextResponse(JSON.stringify(portfolio), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch portfolio data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}


async function getCurrentPrices(coinIds: string[]): Promise<PriceResponse> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd`
    );
    if (!response.ok) {
      console.error("Failed to fetch current prices. Response status:", response.status);
      throw new Error("Failed to fetch current prices");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getCurrentPrices:", error);
    throw error;
  }
}

async function getMarketChart(coinId: string, days: string): Promise<any> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    if (!response.ok) {
      console.error(`Failed to fetch market chart for ${coinId}. Response status:`, response.status);
      throw new Error(`Failed to fetch market chart data for ${coinId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in getMarketChart for ${coinId}:`, error);
    throw error;
  }
}


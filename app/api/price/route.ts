export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const symbol =
    searchParams.get("symbol") || "BTCUSDT";

  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return Response.json({
      symbol,

      // Current Price
      price: parseFloat(data.lastPrice),

      // 24h Change %
      changePercent: parseFloat(data.priceChangePercent),

      // Volume
      volume: parseFloat(data.volume),

      // High / Low
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
    });

  } catch (error) {
    return Response.json(
      { error: "Failed to fetch price" },
      { status: 500 }
    );
  }
}
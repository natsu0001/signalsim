type BinanceTickerResponse = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
};

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const symbol =
    searchParams.get("symbol") ??
    "BTCUSDT";

  try {
    const response = await fetch(
      `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=${symbol}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        {
          error: "Binance API failed",
        },
        {
          status: 500,
        }
      );
    }

    const data: BinanceTickerResponse =
      await response.json();

    return Response.json({
      symbol: data.symbol,
      price: Number(data.lastPrice),
      changePercent: Number(
        data.priceChangePercent
      ),
      volume: Number(data.volume),
      high: Number(data.highPrice),
      low: Number(data.lowPrice),
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Price fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}
type BinanceTickerResponse = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  volume: string;
  highPrice: string;
  lowPrice: string;
};

type PriceResponse = {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
};

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const symbol =
    searchParams.get("symbol") ??
    "BTCUSDT";

  try {
    // ================= FETCH MARKET =================

    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        {
          error:
            "Failed to fetch market price",
        },
        {
          status: 500,
        }
      );
    }

    const data: BinanceTickerResponse =
      await response.json();

    // ================= FORMAT =================

    const result: PriceResponse = {
      symbol: data.symbol,

      price: Number(
        data.lastPrice
      ),

      changePercent: Number(
        data.priceChangePercent
      ),

      volume: Number(
        data.volume
      ),

      high: Number(
        data.highPrice
      ),

      low: Number(
        data.lowPrice
      ),
    };

    return Response.json(result);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Price fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}
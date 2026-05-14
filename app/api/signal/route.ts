import { calculateRSI } from "@/lib/indicators";

type BinanceKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
];

type SignalType =
  | "BUY"
  | "SELL"
  | "HOLD";

type SignalResponse = {
  symbol: string;
  rsi: number;
  signal: SignalType;
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
    // ================= FETCH KLINES =================

    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=100`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        {
          error:
            "Failed to fetch market data",
        },
        {
          status: 500,
        }
      );
    }

    const data: BinanceKline[] =
      await response.json();

    // ================= CLOSE PRICES =================

    const closes = data.map(
      (candle) =>
        Number(candle[4])
    );

    // ================= RSI =================

    const rsiValues =
      calculateRSI(closes);

    const latestRSI =
      rsiValues[
        rsiValues.length - 1
      ];

    let signal: SignalType =
      "HOLD";

    if (latestRSI < 30) {
      signal = "BUY";
    } else if (
      latestRSI > 70
    ) {
      signal = "SELL";
    }

    const result: SignalResponse =
      {
        symbol,
        rsi: latestRSI,
        signal,
      };

    return Response.json(result);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Signal generation failed",
      },
      {
        status: 500,
      }
    );
  }
}
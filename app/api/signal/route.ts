import { calculateRSI } from "@/lib/indicators";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "BTCUSDT";

  try {
    // Fetch historical candles
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=100`
    );

    const data = await res.json();

    // Extract closing prices
    const closes = data.map((candle: any) => parseFloat(candle[4]));

    // Calculate RSI
    const rsiValues = calculateRSI(closes);
    const latestRSI = rsiValues[rsiValues.length - 1];

    let signal = "HOLD";

    if (latestRSI < 30) signal = "BUY";
    else if (latestRSI > 70) signal = "SELL";

    return Response.json({
      symbol,
      rsi: latestRSI,
      signal,
    });

  } catch (error) {
    return Response.json({ error: "Signal failed" }, { status: 500 });
  }
}
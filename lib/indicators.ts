import { RSI } from "technicalindicators";

export function calculateRSI(closes: number[]) {
  const rsi = RSI.calculate({
    values: closes,
    period: 14,
  });

  return rsi;
}
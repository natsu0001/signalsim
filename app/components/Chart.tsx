"use client";
import { useEffect, useRef } from "react";

export default function Chart({ symbol = "BTCUSDT" }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "15",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: false,
    });

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="bg-zinc-900 p-2 rounded-xl h-[400px]">
      <div ref={container} className="h-full w-full" />
    </div>
  );
}
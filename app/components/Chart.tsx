"use client";

import { useEffect, useRef } from "react";
import DashboardCard from "./cards/DashboardCard";

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function Chart({
  symbol,
}: {
  symbol: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.innerHTML = "";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      save_image: false,
      studies: ["RSI@tv-basicstudies"],
      container_id: "tradingview_chart",
    });

    chartRef.current.appendChild(script);
  }, [symbol]);

  return (
    <DashboardCard className="p-0 overflow-hidden">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        
        <div>
          <h2 className="text-xl font-semibold">
            {symbol}
          </h2>

          <p className="text-zinc-400 text-sm">
            Live Market Chart
          </p>
        </div>

        {/* Timeframes */}
        <div className="flex gap-2">
          {["1m", "5m", "15m", "1h", "4h"].map((time) => (
            <button
              key={time}
              className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm transition"
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[500px]">
        <div
          ref={chartRef}
          id="tradingview_chart"
          className="w-full h-full"
        />
      </div>
    </DashboardCard>
  );
}
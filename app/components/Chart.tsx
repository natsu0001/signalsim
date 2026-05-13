"use client";

import { useEffect, useRef, useState } from "react";
import DashboardCard from "./cards/DashboardCard";

declare global {
  interface Window {
    TradingView?: unknown;
  }
}

const timeframes = [
  { label: "1m", value: "1" },
  { label: "5m", value: "5" },
  { label: "15m", value: "15" },
  { label: "1h", value: "60" },
  { label: "4h", value: "240" },
];

export default function Chart({
  symbol,
}: {
  symbol: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  const [interval, setIntervalState] =
    useState("15");

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
      interval,
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

  }, [symbol, interval]);

  return (
    <DashboardCard className="p-0 overflow-hidden">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between flex-wrap gap-4">

        {/* Left */}
        <div>
          <h2 className="text-xl font-semibold">
            {symbol}
          </h2>

          <p className="text-zinc-400 text-sm">
            Live Market Chart
          </p>
        </div>

        {/* Timeframes */}
        <div className="flex gap-2 flex-wrap">

          {timeframes.map((time) => (
            <button
              key={time.value}
              onClick={() =>
                setIntervalState(time.value)
              }
              className={`
                px-3 py-1.5 rounded-lg text-sm transition
                border
                ${
                  interval === time.value
                    ? `
                      bg-green-500/10
                      text-green-400
                      border-green-500/30
                    `
                    : `
                      bg-zinc-900
                      text-zinc-400
                      border-zinc-800
                      hover:bg-zinc-800
                      hover:text-white
                    `
                }
              `}
            >
              {time.label}
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
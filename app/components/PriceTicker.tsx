"use client";

import { useEffect, useState } from "react";
import DashboardCard from "./cards/DashboardCard";

type MarketData = {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
};

export default function PriceTicker({
  symbol,
}: {
  symbol: string;
}) {
  const [market, setMarket] =
    useState<MarketData | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `/api/price?symbol=${symbol}`
        );

        const data = await res.json();

        setMarket(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 3000);

    return () => clearInterval(interval);
  }, [symbol]);

  // Loading State
  if (!market) {
    return (
      <DashboardCard>
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-zinc-800 rounded w-1/4" />
          <div className="h-10 bg-zinc-800 rounded w-1/2" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 bg-zinc-800 rounded-xl" />
            <div className="h-16 bg-zinc-800 rounded-xl" />
            <div className="h-16 bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </DashboardCard>
    );
  }

  const isPositive = market.changePercent >= 0;

  return (
    <DashboardCard className="relative overflow-hidden">

      {/* Background Glow */}
      <div
        className={`
          absolute inset-0 opacity-10 pointer-events-none
          ${
            isPositive
              ? "bg-green-500"
              : "bg-red-500"
          }
        `}
      />

      <div className="relative">

        {/* TOP */}
        <div className="flex items-center justify-between flex-wrap gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-5">

            {/* Live Status */}
            <div className="flex items-center gap-2">
              <div
                className={`
                  w-2.5 h-2.5 rounded-full animate-pulse
                  ${
                    isPositive
                      ? "bg-green-400"
                      : "bg-red-400"
                  }
                `}
              />

              <span className="text-sm text-zinc-400">
                LIVE MARKET
              </span>
            </div>

            {/* Symbol */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {market.symbol}
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                Binance Exchange
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">

            <p
              className={`
                text-4xl font-bold tracking-tight
                ${
                  isPositive
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              ₹ {market.price.toLocaleString()}
            </p>

            <p
              className={`
                mt-2 text-sm font-medium
                ${
                  isPositive
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              {isPositive ? "+" : ""}
              {market.changePercent.toFixed(2)}%
              Today
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

          {/* High */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm mb-1">
              24h High
            </p>

            <h3 className="text-xl font-semibold text-green-400">
              ₹ {market.high.toLocaleString()}
            </h3>
          </div>

          {/* Low */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm mb-1">
              24h Low
            </p>

            <h3 className="text-xl font-semibold text-red-400">
              ₹ {market.low.toLocaleString()}
            </h3>
          </div>

          {/* Volume */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-sm mb-1">
              Volume
            </p>

            <h3 className="text-xl font-semibold text-white">
              {market.volume.toLocaleString()}
            </h3>
          </div>

        </div>
      </div>
    </DashboardCard>
  );
}
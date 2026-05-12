"use client";

import { useEffect, useState } from "react";
import DashboardCard from "./cards/DashboardCard";

export default function PriceTicker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(`/api/price?symbol=${symbol}`);
      const data = await res.json();
      setPrice(data.price);
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 3000); // update every 3s

    return () => clearInterval(interval);
  }, [symbol]);

  //loading state
  if (!price) {
  return (
    <DashboardCard>
      <div className="animate-pulse space-y-3">
        <div className="h-5 bg-zinc-800 rounded w-1/4" />
        <div className="h-8 bg-zinc-800 rounded w-1/2" />
      </div>
    </DashboardCard>
  );
}

  return (
 <DashboardCard className="py-4">

    <div className="flex items-center justify-between flex-wrap gap-4">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Live Dot */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />

          <span className="text-sm text-zinc-400">
            LIVE
          </span>
        </div>

        {/* Symbol */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {symbol}
          </h2>

          <p className="text-zinc-500 text-sm">
            Binance Market
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right">

        <p className="text-3xl font-bold text-green-400 tracking-tight">
          {price ? `₹ ${price.toLocaleString()}` : "--"}
        </p>

        <p className="text-sm text-green-400 mt-1">
          +2.14% Today
        </p>
      </div>
    </div>
  </DashboardCard>
  );
}
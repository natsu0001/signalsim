"use client";

import { useState } from "react";

export default function TradePanel({ symbol }: { symbol: string }) {
  const [loading, setLoading] = useState(false);

  const executeTrade = async (type: "BUY" | "SELL") => {
    setLoading(true);

    const priceRes = await fetch(`/api/price?symbol=${symbol}`);
    const priceData = await priceRes.json();

    await fetch("/api/trade", {
      method: "POST",
      body: JSON.stringify({
        symbol,
        type,
        price: priceData.price,
      }),
    });

    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Trade</h3>

      <div className="flex gap-2">
        <button
             onClick={() => executeTrade("BUY")}
             disabled={loading}
             className="bg-green-600 px-4 py-2 disabled:opacity-50"
           >
             BUY
           </button>

        <button
          onClick={() => executeTrade("SELL")}
          className="bg-red-600 px-4 py-2"
          disabled={loading}
        >
          SELL
        </button>
      </div>
    </div>
  );
}
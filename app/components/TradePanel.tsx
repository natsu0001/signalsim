"use client";

import { useState } from "react";

export default function TradePanel({
  symbol,
}: {
  symbol: string;
}) {
  const [loading, setLoading] = useState(false);
  const [autoTrade, setAutoTrade] = useState(false);

  const executeTrade = async (type: "BUY" | "SELL") => {
    try {
      setLoading(true);

      const priceRes = await fetch(`/api/price?symbol=${symbol}`);
      const priceData = await priceRes.json();

      const res = await fetch("/api/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol,
          type,
          price: priceData.price,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Trade Panel</h3>

      <div className="flex gap-2 mb-4">
        <button
          disabled={loading}
          onClick={() => executeTrade("BUY")}
          className="bg-green-600 px-4 py-2 rounded disabled:opacity-50 transition hover:scale-105"
        >
          BUY
        </button>

        <button
          disabled={loading}
          onClick={() => executeTrade("SELL")}
          className="bg-red-600 px-4 py-2 rounded disabled:opacity-50 transition hover:scale-105"
        >
          SELL
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={autoTrade}
          onChange={() => setAutoTrade(!autoTrade)}
        />
        Auto Trade
      </label>
    </div>
  );
}
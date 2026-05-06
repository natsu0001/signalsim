"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold">{symbol}</h3>
      <p className="text-2xl text-green-400">
        {price ? `₹ ${price}` : "Loading..."}
      </p>
    </div>
  );
}
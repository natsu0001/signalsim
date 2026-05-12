"use client";
import DashboardCard from "../components/cards/DashboardCard";
import { useEffect, useState } from "react";

export default function SignalPanel({ symbol }: { symbol: string }) {
  const [signal, setSignal] = useState("Loading...");
  const [rsi, setRsi] = useState<number | null>(null);

  useEffect(() => {
    const fetchSignal = async () => {
      const res = await fetch(`/api/signal?symbol=${symbol}`);
      const data = await res.json();

      setSignal(data.signal);
      setRsi(data.rsi);
    };

    fetchSignal();

    const interval = setInterval(fetchSignal, 5000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <DashboardCard>
   
      <h3 className="text-lg font-semibold mb-2">Signal</h3>

      <p className="text-gray-400">RSI: {rsi?.toFixed(2)}</p>

      <p
        className={`text-4xl font-bold mt-2 ${
          signal === "BUY"
            ? "text-green-400"
            : signal === "SELL"
            ? "text-red-400"
            : "text-yellow-400"
        }`}
      >
        {signal}
      </p>
   
    </DashboardCard>
  );
}
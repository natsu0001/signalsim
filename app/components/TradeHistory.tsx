"use client";
import DashboardCard from "../components/cards/DashboardCard";
import { useEffect, useState } from "react";

export default function TradeHistory() {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const res = await fetch("/api/trades");
      const data = await res.json();
      setTrades(data);
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 3000);

    return () => clearInterval(interval);
  }, []);

  const calculatePnL = (trade: any) => {
    if (trade.status !== "CLOSED") return 0;
    return (trade.exitPrice - trade.price) * trade.quantity;
  };

  return (
    <DashboardCard>
    
      <h3 className="text-lg font-semibold mb-3">Trade History</h3>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {trades.map((trade) => {
          const pnl = calculatePnL(trade);

          return (
            
            <div
              key={trade.id}
              className="border border-zinc-700 p-2 rounded"
            >
              <p className="text-sm">{trade.symbol}</p>

              <p className="text-xs text-gray-400">
                Entry: {trade.price} | Exit: {trade.exitPrice || "-"}
              </p>

              <p
                className={`text-sm ${
                  pnl > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                P&L: {pnl.toFixed(2)}
              </p>

              <p className="text-xs text-gray-500">{trade.status}</p>
            </div>
          );
        })}
      </div>
    
    </DashboardCard>
   
  );
}
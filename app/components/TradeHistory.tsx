"use client";
import DashboardCard from "../components/cards/DashboardCard";
import { Trade } from "../types/trade";
import { useEffect, useState } from "react";

export default function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([]);

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

 const calculatePnL = (trade: Trade) => {
  if (trade.status !== "CLOSED" || trade.exitPrice == null) {
    return 0;
   }

    return (trade.exitPrice - trade.price) * trade.quantity;
  };

return (
  <DashboardCard>

    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Trade History
        </h2>

        <p className="text-zinc-400 text-sm">
          Recent executed trades
        </p>
      </div>

      <div className="px-3 py-1 rounded-lg bg-zinc-800 text-sm text-zinc-300">
        {trades.length} Trades
      </div>
    </div>

    {/* Trades */}
    <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">

      {trades.length === 0 && (
        <div className="text-center py-10 text-zinc-500">
          No trades yet
        </div>
      )}

      {trades.map((trade) => {
        const pnl = calculatePnL(trade);

        return (
          <div
            key={trade.id}
            className="
              border border-zinc-800
              bg-zinc-900/50
              hover:bg-zinc-800/60
              transition
              rounded-xl
              p-4
            "
          >

            {/* Top Row */}
            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-medium text-white">
                  {trade.symbol}
                </h3>

                <p className="text-xs text-zinc-500 mt-1">
                  {trade.type}
                </p>
              </div>

              <div
                className={`
                  px-2 py-1 rounded-lg text-xs font-medium
                  ${
                    trade.status === "OPEN"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-green-500/10 text-green-400"
                  }
                `}
              >
                {trade.status}
              </div>
            </div>

            {/* Middle */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">

              <div>
                <p className="text-zinc-500 text-xs mb-1">
                  Entry
                </p>

                <p>{trade.price}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs mb-1">
                  Exit
                </p>

                <p>{trade.exitPrice || "-"}</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs mb-1">
                  Quantity
                </p>

                <p>{trade.quantity}</p>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-4 flex items-center justify-between">

              <p className="text-xs text-zinc-500">
                {new Date(trade.createdAt).toLocaleString()}
              </p>

              <p
                className={`
                  font-semibold
                  ${
                    pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                {trade.status === "OPEN"
                  ? "--"
                  : `${pnl.toFixed(2)}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </DashboardCard>
);
}
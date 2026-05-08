"use client";

import { useEffect, useState } from "react";

export default function StatsPanel() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();

    const interval = setInterval(fetchStats, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-3">
        Performance
      </h3>

      <div className="space-y-2 text-sm">
        <p>Total Trades: {stats.totalTrades}</p>

        <p className="text-green-400">
          Wins: {stats.wins}
        </p>

        <p className="text-red-400">
          Losses: {stats.losses}
        </p>

        <p>
          Win Rate: {stats.winRate.toFixed(2)}%
        </p>

        <p
          className={
            stats.totalPnL >= 0
              ? "text-green-400"
              : "text-red-400"
          }
        >
          Total P&L: {stats.totalPnL.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
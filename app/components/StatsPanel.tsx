"use client";

import DashboardCard from "../components/cards/DashboardCard";

import { useEffect, useState } from "react";

import { Stats } from "../types/stats";

export default function StatsPanel() {

  const [stats, setStats] =
    useState<Stats | null>(null);

  useEffect(() => {

    const fetchStats = async () => {

      const res = await fetch("/api/stats");

      const data: Stats = await res.json();

      setStats(data);
    };

    fetchStats();

    const interval = setInterval(fetchStats, 3000);

    return () => clearInterval(interval);

  }, []);

  if (!stats) {

    return (
      <DashboardCard>
        <div className="animate-pulse space-y-4">

          <div className="flex items-center justify-between">

            <div className="space-y-2">
              <div className="h-4 w-24 bg-zinc-800 rounded" />
              <div className="h-8 w-32 bg-zinc-800 rounded" />
            </div>

            <div className="w-12 h-12 rounded-xl bg-zinc-800" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-800 rounded" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded" />
            <div className="h-4 w-4/6 bg-zinc-800 rounded" />
          </div>

        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>

      <div className="flex items-center justify-between mb-4">

        <div>
          <p className="text-zinc-400 text-sm">
            Win Rate
          </p>

          <h2 className="text-3xl font-bold">
            {stats.winRate.toFixed(1)}%
          </h2>
        </div>

        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
          📈
        </div>

      </div>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Total Trades
          </span>

          <span>{stats.totalTrades}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Wins
          </span>

          <span className="text-green-400">
            {stats.wins}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-400">
            Losses
          </span>

          <span className="text-red-400">
            {stats.losses}
          </span>
        </div>

      </div>

    </DashboardCard>
  );
}
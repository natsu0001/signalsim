"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../components/cards/DashboardCard";
export default function Portfolio() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setBalance(data.balance);
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 3000);

    return () => clearInterval(interval);
  }, []);


  if (balance === null) {
  return (
    <DashboardCard>
      <div className="animate-pulse space-y-3">
        <div className="h-5 bg-zinc-800 rounded w-1/3" />
        <div className="h-10 bg-zinc-800 rounded w-2/3" />
      </div>
    </DashboardCard>
  );
}

  return (
<DashboardCard className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />

  <div className="relative">
    <p className="text-zinc-400 text-sm mb-2">
      Portfolio Balance
    </p>

    <h2 className="text-3xl font-bold tracking-tight">
      ₹ {balance?.toFixed(2)}
    </h2>

    <p className="text-green-400 text-sm mt-2">
      +2.34% today
    </p>
  </div>
</DashboardCard>
  );
}
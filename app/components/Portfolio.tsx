"use client";

import { useEffect, useState } from "react";
import DashboardCard from "../components/cards/DashboardCard";
export default function Portfolio() {
  const [balance, setBalance] = useState(0);

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

  return (
    <DashboardCard>
    
      <h3 className="text-lg font-semibold mb-2">Portfolio</h3>

      <p className="text-xl text-green-400">
        ₹ {balance.toFixed(2)}
      </p>
    
    </DashboardCard>
  );
}
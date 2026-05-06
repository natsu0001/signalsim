"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
      <p>Balance: ₹{balance?.toFixed(2)}</p>
    </div>
  );
}
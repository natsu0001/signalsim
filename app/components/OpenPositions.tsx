"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardCard from "./cards/DashboardCard";

type Position = {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  createdAt: string;
};

type PriceMap = {
  [symbol: string]: number;
};

export default function OpenPositions() {
  const [positions, setPositions] = useState<Position[]>([]);

  const [prices, setPrices] = useState<PriceMap>({});

  // ================= FETCH OPEN POSITIONS =================

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await fetch("/api/open-positions");

      const data = await res.json();

      setPositions(data);
    };

    fetchPositions();

    const interval = setInterval(fetchPositions, 3000);

    return () => clearInterval(interval);
  }, []);

  // ================= FETCH LIVE PRICES =================

  useEffect(() => {
    const fetchPrices = async () => {

      const updatedPrices: PriceMap = {};

      for (const position of positions) {

        const res = await fetch(
          `/api/price?symbol=${position.symbol}`
        );

        const data = await res.json();

        updatedPrices[position.symbol] = data.price;
      }

      setPrices(updatedPrices);
    };

    if (positions.length > 0) {
      fetchPrices();

      const interval = setInterval(fetchPrices, 3000);

      return () => clearInterval(interval);
    }
  }, [positions]);

  // ================= PNL =================

  const calculatePnL = (
    entryPrice: number,
    currentPrice: number,
    quantity: number
  ) => {
    return (currentPrice - entryPrice) * quantity;
  };

  return (
    <DashboardCard>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold">
            Open Positions
          </h2>

          <p className="text-zinc-400 text-sm">
            Live running trades
          </p>
        </div>

        <div className="px-3 py-1 rounded-lg bg-zinc-800 text-sm">
          {positions.length}
        </div>
      </div>

      {/* Empty */}
      {positions.length === 0 && (
        <div className="text-center py-10 text-zinc-500">
          No active positions
        </div>
      )}

      {/* Positions */}
      <div className="space-y-3">

{positions.map((position) => {

  const currentPrice =
    prices[position.symbol];

  const pnl =
    currentPrice
      ? calculatePnL(
          position.price,
          currentPrice,
          position.quantity
        )
      : 0;

  const pnlPercent =
    currentPrice
      ? (
          ((currentPrice -
            position.price) /
            position.price) *
          100
        ).toFixed(2)
      : "0";

  const isProfit = pnl >= 0;

  return (
    <motion.div
      key={position.id}

      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.3,
      }}

      whileHover={{
        scale: 1.01,
      }}

      className={`
        border
        rounded-2xl
        p-4
        transition-all duration-300
        ${
          isProfit
            ? `
              border-green-500/20
              bg-green-500/[0.03]
              hover:bg-green-500/[0.05]
            `
            : `
              border-red-500/20
              bg-red-500/[0.03]
              hover:bg-red-500/[0.05]
            `
        }
      `}
    >

      {/* Top */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">
            {position.symbol}
          </h3>

          <p className="text-xs text-zinc-500 mt-1">
            Qty: {position.quantity}
          </p>
        </div>

        <div className="text-right">

          <p className="text-sm text-zinc-400">
            Live Price
          </p>

          <p className="font-semibold">
            ₹ {currentPrice?.toLocaleString() || "--"}
          </p>
        </div>
      </div>

      {/* Middle */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-zinc-500 mb-1">
            Entry
          </p>

          <p>
            ₹ {position.price.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-zinc-500 mb-1">
            Current Value
          </p>

          <p>
            ₹{" "}
            {currentPrice
              ? (
                  currentPrice *
                  position.quantity
                ).toFixed(2)
              : "--"}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between">

        <p className="text-xs text-zinc-500">
          {new Date(
            position.createdAt
          ).toLocaleString()}
        </p>

        <div className="text-right">

          <p
            className={`
              font-bold text-lg
              ${
                isProfit
                  ? "text-green-400"
                  : "text-red-400"
              }
            `}
          >
            {isProfit ? "+" : ""}
            ₹ {pnl.toFixed(2)}
          </p>

          <p
            className={`
              text-xs mt-1
              ${
                isProfit
                  ? "text-green-300"
                  : "text-red-300"
              }
            `}
          >
            {isProfit ? "+" : ""}
            {pnlPercent}%
          </p>

        </div>
      </div>
    </motion.div>
  );
})}
      </div>
    </DashboardCard>
  );
}
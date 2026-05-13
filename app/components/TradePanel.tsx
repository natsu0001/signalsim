"use client";

import DashboardCard from "../components/cards/DashboardCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TradePanel({
  symbol,
}: {
  symbol: string;
}) {
  const [loading, setLoading] = useState(false);

  const [autoTrade, setAutoTrade] =
    useState(false);

  const [quantity, setQuantity] =
    useState(0.01);

  const [price, setPrice] =
    useState<number | null>(null);

  // ================= LIVE PRICE =================

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `/api/price?symbol=${symbol}`
        );

        const data = await res.json();

        setPrice(data.price);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPrice();

    const interval = setInterval(
      fetchPrice,
      3000
    );

    return () => clearInterval(interval);

  }, [symbol]);

  // ================= EXECUTE TRADE =================

  const executeTrade = async (
    type: "BUY" | "SELL"
  ) => {
    try {
      setLoading(true);

      if (!price) {
        toast.error("Price unavailable");
        return;
      }

      const res = await fetch("/api/trade", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          symbol,
          type,
          quantity,
          price,
        }),
      });

      const data = await res.json();

      // ERROR
      if (data.error) {
        toast.error(data.error);
        return;
      }

      // SUCCESS
      toast.success(
        `${type} order executed`
      );

    } catch (err) {
      console.error(err);

      toast.error("Trade failed");

    } finally {
      setLoading(false);
    }
  };

  // ================= TOTAL COST =================

  const totalCost =
    price && quantity
      ? (price * quantity).toFixed(2)
      : "0";

  return (
    <DashboardCard>

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold">
          Trade Panel
        </h3>

        <p className="text-zinc-400 text-sm mt-1">
          Execute paper trades instantly
        </p>
      </div>

      {/* Symbol */}
      <div className="mb-4">
        <p className="text-zinc-500 text-sm mb-2">
          Symbol
        </p>

        <div className="
          bg-zinc-900
          border border-zinc-800
          rounded-xl
          px-4 py-3
          flex items-center justify-between
        ">
          <span>{symbol}</span>

          <span className="
            text-xs
            text-green-400
            flex items-center gap-2
          ">
            <div className="
              w-2 h-2 rounded-full
              bg-green-400 animate-pulse
            " />

            LIVE
          </span>
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-5">

        <div className="
          flex items-center justify-between mb-2
        ">
          <label className="
            text-sm text-zinc-400
          ">
            Quantity
          </label>

          <span className="
            text-xs text-zinc-500
          ">
            Position Size
          </span>
        </div>

        <input
          type="number"
          step="0.01"
          min="0.01"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
          className="
            w-full
            bg-zinc-900
            border border-zinc-800
            rounded-xl
            px-4 py-3
            outline-none
            transition
            focus:border-green-500/40
            focus:ring-2
            focus:ring-green-500/10
          "
        />
      </div>

      {/* Quick Quantity */}
      <div className="
        flex gap-2 flex-wrap mb-5
      ">
        {[0.01, 0.05, 0.1, 0.5, 1].map(
          (q) => (
            <button
              key={q}
              onClick={() => setQuantity(q)}
              className={`
                px-3 py-1.5
                rounded-lg
                text-sm
                border
                transition-all duration-200
                ${
                  quantity === q
                    ? `
                      bg-green-500/15
                      border-green-500/30
                      text-green-400
                    `
                    : `
                      bg-zinc-900
                      border-zinc-800
                      text-zinc-400
                      hover:bg-zinc-800
                    `
                }
              `}
            >
              {q}
            </button>
          )
        )}
      </div>

      {/* Summary */}
      <div className="
        bg-zinc-900/60
        border border-zinc-800
        rounded-xl
        p-4
        mb-5
        space-y-3
      ">

        <div className="
          flex items-center justify-between
          text-sm
        ">
          <span className="text-zinc-400">
            Current Price
          </span>

          <span className="font-medium">
            ₹ {price?.toLocaleString() || "--"}
          </span>
        </div>

        <div className="
          flex items-center justify-between
          text-sm
        ">
          <span className="text-zinc-400">
            Estimated Cost
          </span>

          <span className="
            font-semibold text-green-400
          ">
            ₹ {totalCost}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="
        grid grid-cols-2 gap-3 mb-5
      ">

        <button
          disabled={loading}
          onClick={() =>
            executeTrade("BUY")
          }
          className="
            bg-green-500
            hover:bg-green-400
            text-black
            font-semibold
            py-3
            rounded-xl
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-50
          "
        >
          {loading
            ? "Processing..."
            : "BUY"}
        </button>

        <button
          disabled={loading}
          onClick={() =>
            executeTrade("SELL")
          }
          className="
            bg-red-500
            hover:bg-red-400
            text-white
            font-semibold
            py-3
            rounded-xl
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-50
          "
        >
          {loading
            ? "Processing..."
            : "SELL"}
        </button>
      </div>

      {/* Auto Trade */}
      <label className="
        flex items-center gap-3
        text-sm text-zinc-300
      ">

        <input
          type="checkbox"
          checked={autoTrade}
          onChange={() =>
            setAutoTrade(!autoTrade)
          }
          className="accent-green-500"
        />

        Enable Auto Trade
      </label>

    </DashboardCard>
  );
}
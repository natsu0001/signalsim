"use client";

import DashboardCard from "../components/cards/DashboardCard";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useMarketStore } from "../store/useMarketStore";

export default function TradePanel() {
  const { symbol } = useMarketStore();

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
        `${type} order executed successfully`
      );

    } catch (err) {
      console.error(err);

      toast.error("Trade failed");

    } finally {
      setLoading(false);
    }
  };

  // ================= CALCULATIONS =================

  const totalCost = useMemo(() => {
    if (!price) return 0;

    return price * quantity;
  }, [price, quantity]);

  const estimatedFee = useMemo(() => {
    return totalCost * 0.001;
  }, [totalCost]);

  const finalCost = useMemo(() => {
    return totalCost + estimatedFee;
  }, [totalCost, estimatedFee]);

  return (
    <DashboardCard className="sticky top-6">

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              Trade Panel
            </h3>

            <p className="text-zinc-400 text-sm mt-1">
              Execute paper trades instantly
            </p>
          </div>

          {/* LIVE */}
          <div className="
            flex items-center gap-2
            px-3 py-1.5
            rounded-full
            bg-green-500/10
            border border-green-500/20
          ">
            <div className="
              w-2 h-2 rounded-full
              bg-green-400 animate-pulse
            " />

            <span className="
              text-xs font-medium text-green-400
            ">
              LIVE
            </span>
          </div>

        </div>
      </div>

      {/* Symbol Card */}
      <div className="
        mb-5
        rounded-2xl
        border border-zinc-800
        bg-gradient-to-br
        from-zinc-900
        to-zinc-950
        p-4
      ">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              Trading Pair
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {symbol}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-zinc-500 text-xs">
              Market Price
            </p>

            <h3 className="
              text-xl font-bold
              text-green-400 mt-1
            ">
              ₹{" "}
              {price
                ? price.toLocaleString()
                : "--"}
            </h3>
          </div>

        </div>
      </div>

      {/* Quantity */}
      <div className="mb-5">

        <div className="
          flex items-center justify-between
          mb-2
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
            rounded-2xl
            px-4 py-4
            text-lg
            outline-none
            transition-all
            focus:border-green-500/40
            focus:ring-4
            focus:ring-green-500/10
          "
        />
      </div>

      {/* Quick Buttons */}
      <div className="
        grid grid-cols-5 gap-2
        mb-6
      ">
        {[0.01, 0.05, 0.1, 0.5, 1].map(
          (q) => (
            <button
              key={q}
              onClick={() => setQuantity(q)}
              className={`
                py-2 rounded-xl
                text-sm font-medium
                border transition-all duration-200
                ${
                  quantity === q
                    ? `
                      bg-green-500/15
                      border-green-500/30
                      text-green-400
                      scale-[1.03]
                    `
                    : `
                      bg-zinc-900
                      border-zinc-800
                      text-zinc-400
                      hover:bg-zinc-800
                      hover:text-white
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
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/60
        p-4
        mb-6
        space-y-4
      ">

        <div className="
          flex items-center justify-between
          text-sm
        ">
          <span className="text-zinc-400">
            Entry Price
          </span>

          <span className="font-medium">
            ₹{" "}
            {price
              ? price.toLocaleString()
              : "--"}
          </span>
        </div>

        <div className="
          flex items-center justify-between
          text-sm
        ">
          <span className="text-zinc-400">
            Position Value
          </span>

          <span className="font-medium">
            ₹ {totalCost.toFixed(2)}
          </span>
        </div>

        <div className="
          flex items-center justify-between
          text-sm
        ">
          <span className="text-zinc-400">
            Estimated Fee
          </span>

          <span className="text-yellow-400">
            ₹ {estimatedFee.toFixed(2)}
          </span>
        </div>

        <div className="
          border-t border-zinc-800
          pt-3
          flex items-center justify-between
        ">
          <span className="
            text-sm text-zinc-300
          ">
            Total Cost
          </span>

          <span className="
            text-lg font-bold text-green-400
          ">
            ₹ {finalCost.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Trade Buttons */}
      <div className="
        grid grid-cols-2 gap-3
        mb-6
      ">

        <button
          disabled={loading}
          onClick={() =>
            executeTrade("BUY")
          }
          className="
            bg-green-500
            hover:bg-green-400
            disabled:opacity-50
            text-black
            font-semibold
            py-4
            rounded-2xl
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
            shadow-lg shadow-green-500/20
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
            disabled:opacity-50
            text-white
            font-semibold
            py-4
            rounded-2xl
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
            shadow-lg shadow-red-500/20
          "
        >
          {loading
            ? "Processing..."
            : "SELL"}
        </button>
      </div>

      {/* Auto Trade */}
      <div className="
        border border-zinc-800
        bg-zinc-900/40
        rounded-2xl
        p-4
      ">
        <label className="
          flex items-center justify-between
          cursor-pointer
        ">

          <div>
            <p className="
              text-sm font-medium
            ">
              Auto Trade
            </p>

            <p className="
              text-xs text-zinc-500 mt-1
            ">
              Automatically follow signals
            </p>
          </div>

          <input
            type="checkbox"
            checked={autoTrade}
            onChange={() =>
              setAutoTrade(!autoTrade)
            }
            className="
              h-5 w-5
              accent-green-500
            "
          />
        </label>
      </div>

    </DashboardCard>
  );
}
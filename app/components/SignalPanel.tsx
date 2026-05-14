"use client";

import DashboardCard from "../components/cards/DashboardCard";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useMarketStore } from "../store/useMarketStore";

type SignalType =
  | "BUY"
  | "SELL"
  | "HOLD";

type SignalResponse = {
  signal: SignalType;
  rsi: number;
};

export default function SignalPanel() {
  const { symbol } = useMarketStore();

  const [signal, setSignal] =
    useState<SignalType>("HOLD");

  const [rsi, setRsi] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const res = await fetch(
          `/api/signal?symbol=${symbol}`
        );

        const data: SignalResponse =
          await res.json();

        setSignal(data.signal);

        setRsi(data.rsi);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    fetchSignal();

    const interval = setInterval(
      fetchSignal,
      5000
    );

    return () =>
      clearInterval(interval);

  }, [symbol]);

  // ================= COLORS =================

  const signalStyles = useMemo(() => {
    switch (signal) {
      case "BUY":
        return {
          text: "text-green-400",
          bg: "bg-green-500/10",
          border:
            "border-green-500/20",
          glow:
            "shadow-green-500/20",
          emoji: "🟢",
        };

      case "SELL":
        return {
          text: "text-red-400",
          bg: "bg-red-500/10",
          border:
            "border-red-500/20",
          glow:
            "shadow-red-500/20",
          emoji: "🔴",
        };

      default:
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border:
            "border-yellow-500/20",
          glow:
            "shadow-yellow-500/20",
          emoji: "🟡",
        };
    }
  }, [signal]);

  // ================= RSI STATUS =================

  const rsiStatus = useMemo(() => {
    if (!rsi) return "Loading";

    if (rsi < 30)
      return "Oversold";

    if (rsi > 70)
      return "Overbought";

    return "Neutral";
  }, [rsi]);

  // ================= LOADING =================

  if (loading) {
    return (
      <DashboardCard>
        <div className="animate-pulse space-y-4">

          <div className="flex items-center justify-between">

            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded" />

              <div className="h-10 w-28 bg-zinc-800 rounded" />
            </div>

            <div className="w-14 h-14 rounded-2xl bg-zinc-800" />
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-800 rounded" />

            <div className="h-4 w-5/6 bg-zinc-800 rounded" />
          </div>

        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard className="relative overflow-hidden">

      {/* Background Glow */}
      <motion.div
        key={signal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{
          duration: 0.3,
        }}
        className={`
          absolute inset-0
          pointer-events-none
          ${
            signal === "BUY"
              ? "bg-green-500"
              : signal === "SELL"
              ? "bg-red-500"
              : "bg-yellow-500"
          }
        `}
      />

      <div className="relative">

        {/* Header */}
        <div
          className="
            flex items-center
            justify-between
            mb-5
          "
        >

          <div>
            <p
              className="
                text-zinc-400
                text-sm
              "
            >
              AI Signal
            </p>

            <h2
              className="
                text-2xl
                font-bold
                mt-1
              "
            >
              {symbol}
            </h2>
          </div>

          {/* Signal Icon */}
          <motion.div
            key={signal}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`
              w-14 h-14
              rounded-2xl
              flex items-center
              justify-center
              text-2xl
              border
              shadow-lg
              ${signalStyles.bg}
              ${signalStyles.border}
              ${signalStyles.glow}
            `}
          >
            {signalStyles.emoji}
          </motion.div>

        </div>

        {/* Main Signal */}
        <motion.div
          layout
          className={`
            rounded-2xl
            border
            p-5
            mb-5
            transition-all
            duration-300
            ${signalStyles.bg}
            ${signalStyles.border}
          `}
        >

          <p
            className="
              text-zinc-400
              text-sm
              mb-2
            "
          >
            Current Signal
          </p>

          <AnimatePresence
            mode="wait"
          >

            <motion.h1
              key={signal}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                text-5xl
                font-bold
                tracking-tight
                ${signalStyles.text}
              `}
            >
              {signal}
            </motion.h1>

          </AnimatePresence>

          <p
            className="
              text-zinc-500
              text-sm
              mt-3
            "
          >
            Based on RSI momentum
            analysis
          </p>

        </motion.div>

        {/* RSI Stats */}
        <div
          className="
            grid grid-cols-2
            gap-3
          "
        >

          {/* RSI */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-zinc-900/60
              border border-zinc-800
              rounded-2xl
              p-4
            "
          >
            <p
              className="
                text-zinc-500
                text-sm
                mb-2
              "
            >
              RSI Value
            </p>

            <h3
              className="
                text-2xl
                font-bold
              "
            >
              {rsi?.toFixed(2)}
            </h3>
          </motion.div>

          {/* Status */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="
              bg-zinc-900/60
              border border-zinc-800
              rounded-2xl
              p-4
            "
          >
            <p
              className="
                text-zinc-500
                text-sm
                mb-2
              "
            >
              Market State
            </p>

            <h3
              className={`
                text-xl
                font-bold
                ${
                  rsiStatus ===
                  "Oversold"
                    ? "text-green-400"
                    : rsiStatus ===
                      "Overbought"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              `}
            >
              {rsiStatus}
            </h3>
          </motion.div>

        </div>

      </div>
    </DashboardCard>
  );
}
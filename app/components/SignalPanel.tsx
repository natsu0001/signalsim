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

  // ================= FETCH SIGNAL =================

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const res = await fetch(
          `/api/signal?symbol=${symbol}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch signal"
          );
        }

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
          ring:
            "ring-green-500/10",
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
          ring:
            "ring-red-500/10",
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
          ring:
            "ring-yellow-500/10",
          emoji: "🟡",
        };
    }
  }, [signal]);

  // ================= RSI STATUS =================

  const rsiStatus = useMemo(() => {
    if (rsi === null)
      return "Loading";

    if (rsi < 30)
      return "Oversold";

    if (rsi > 70)
      return "Overbought";

    return "Neutral";
  }, [rsi]);

  // ================= RSI PROGRESS =================

  const rsiProgress = useMemo(() => {
    if (!rsi) return 0;

    return Math.min(
      Math.max(rsi, 0),
      100
    );
  }, [rsi]);

  // ================= LOADING =================

  if (loading) {
    return (
      <DashboardCard>
        <div className="animate-pulse space-y-4">

          <div className="flex items-center justify-between">

            <div className="space-y-2">
              <div className="h-4 w-24 bg-zinc-800 rounded" />

              <div className="h-8 w-32 bg-zinc-800 rounded" />
            </div>

            <div className="w-14 h-14 rounded-2xl bg-zinc-800" />
          </div>

          <div className="h-32 rounded-2xl bg-zinc-800" />

          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-zinc-800" />
            <div className="h-24 rounded-2xl bg-zinc-800" />
          </div>

        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard className="relative overflow-hidden">

      {/* Animated Background */}
      <motion.div
        key={signal}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.08,
        }}
        transition={{
          duration: 0.4,
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
        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-zinc-400 text-sm">
              AI Signal
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {symbol}
            </h2>
          </div>

          {/* Animated Icon */}
          <motion.div
            key={signal}
            initial={{
              scale: 0.7,
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
              flex items-center justify-center
              text-2xl
              border
              shadow-lg
              ring-8
              ${signalStyles.bg}
              ${signalStyles.border}
              ${signalStyles.glow}
              ${signalStyles.ring}
            `}
          >
            {signalStyles.emoji}
          </motion.div>

        </div>

        {/* Main Signal Card */}
        <motion.div
          layout
          className={`
            rounded-3xl
            border
            p-5
            mb-5
            backdrop-blur-sm
            shadow-lg
            transition-all duration-300
            ${signalStyles.bg}
            ${signalStyles.border}
          `}
        >

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-zinc-400 text-sm">
                Current Signal
              </p>

              <AnimatePresence mode="wait">

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
                    font-black
                    tracking-tight
                    mt-2
                    ${signalStyles.text}
                  `}
                >
                  {signal}
                </motion.h1>

              </AnimatePresence>

            </div>

            {/* Pulse Dot */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className={`
                w-4 h-4 rounded-full
                ${
                  signal === "BUY"
                    ? "bg-green-400"
                    : signal === "SELL"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }
              `}
            />

          </div>

          {/* RSI Progress */}
          <div className="mb-3">

            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-zinc-400">
                RSI Strength
              </span>

              <span className="font-medium">
                {rsi?.toFixed(2)}
              </span>
            </div>

            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${rsiProgress}%`,
                }}
                transition={{
                  duration: 0.5,
                }}
                className={`
                  h-full rounded-full
                  ${
                    signal === "BUY"
                      ? "bg-green-400"
                      : signal === "SELL"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                  }
                `}
              />

            </div>

          </div>

          <p className="text-zinc-500 text-sm">
            Signal generated from RSI momentum analysis
          </p>

        </motion.div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-3">

          {/* RSI Value */}
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

            <p className="text-zinc-500 text-sm mb-2">
              RSI Value
            </p>

            <h3 className="text-2xl font-bold">
              {rsi?.toFixed(2)}
            </h3>

          </motion.div>

          {/* Market State */}
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

            <p className="text-zinc-500 text-sm mb-2">
              Market State
            </p>

            <h3
              className={`
                text-xl font-bold
                ${
                  rsiStatus === "Oversold"
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
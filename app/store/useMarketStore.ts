"use client";
import { create } from "zustand";

type MarketStore = {
  symbol: string;

  interval: string;

  setSymbol: (symbol: string) => void;

  setInterval: (interval: string) => void;
};

export const useMarketStore =
  create<MarketStore>((set) => ({
    symbol: "BTCUSDT",

    interval: "15",

    setSymbol: (symbol) =>
      set({ symbol }),

    setInterval: (interval) =>
      set({ interval }),
  }));
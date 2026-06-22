"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import OpenPositions from "./components/OpenPositions";
import PriceTicker from "./components/PriceTicker";
import SignalPanel from "./components/SignalPanel";
import Portfolio from "./components/Portfolio";
import StatsPanel from "./components/StatsPanel";
import TradeHistory from "./components/TradeHistory";
import ContentWrapper from "./components/layout/ContentWrapper";

// ================= DYNAMIC IMPORTS =================

const Chart = dynamic(
  () => import("./components/Chart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] rounded-2xl bg-zinc-900 animate-pulse" />
    ),
  }
);

const TradePanel = dynamic(
  () => import("./components/TradePanel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] rounded-2xl bg-zinc-900 animate-pulse" />
    ),
  }
);

const Watchlist = dynamic(
  () => import("./components/Watchlist"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] rounded-2xl bg-zinc-900 animate-pulse" />
    ),
  }
);

export default function Home() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  // ================= HYDRATION FIX =================

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black" />
    );
  }

  return (
    
    <div className="flex min-h-screen bg-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 flex flex-col lg:ml-64 min-h-screen">

        {/* NAVBAR */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto">

          <div className="p-3 sm:p-4 md:p-6 space-y-6 max-w-[2000] mx-auto">

            {/* PRICE TICKER */}
           

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

              {/* LEFT SECTION */}
              <div className="xl:col-span-3 space-y-6">

                {/* CHART */}
                <Chart />

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  <Portfolio />

                  <StatsPanel />

                  <SignalPanel />

                </div>

                {/* OPEN POSITIONS */}
                <OpenPositions />

                {/* TRADE HISTORY */}
                <TradeHistory />

              </div>

              {/* RIGHT SECTION */}
              <div className="space-y-6 xl:sticky xl:top-6 h-fit">

                <Watchlist />
                 <PriceTicker />

                <TradePanel />

              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  
  );
}
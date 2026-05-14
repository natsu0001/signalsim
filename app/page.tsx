"use client";
import {  useState } from "react";
import OpenPositions from "./components/OpenPositions";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Chart from "./components/Chart";
import PriceTicker from "./components/PriceTicker";
import Watchlist from "./components/Watchlist";
import SignalPanel from "./components/SignalPanel";
import TradePanel from "./components/TradePanel";
import Portfolio from "./components/Portfolio";
import StatsPanel from "./components/StatsPanel";
import TradeHistory from "./components/TradeHistory";

import { useMarketStore } from "./store/useMarketStore";

export const dynamic = 'force-dynamic';

export default function Home() {
  const { symbol } = useMarketStore();

  const [sidebarOpen, setSidebarOpen] =
  useState(false);

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* SIDEBAR */}
      <Sidebar
       open={sidebarOpen}
        setOpen={setSidebarOpen}
        />

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-h-screen  lg:ml-64 ">

        {/* NAVBAR */}
        <Navbar
      
         sidebarOpen={sidebarOpen}
         setSidebarOpen={setSidebarOpen}
           />

        {/* CONTENT */}
        <div className=" p-3 sm:p-4 md:p-6 space-y-6 overflow-y-auto w-full max-w-[1800px] mx-auto">

          {/* MARKET */}
          <PriceTicker />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            {/* LEFT */}
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

            {/* RIGHT */}
            <div className="xl:sticky xl:top-6 h-fit space-y-6">

              <Watchlist />

              <TradePanel />

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
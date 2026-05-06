"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";
import SignalPanel from "./components/SignalPanel";
import TradePanel from "./components/TradePanel";
import Portfolio from "./components/Portfolio";
import PriceTicker from "./components/PriceTicker";

export default function Home() {
  const [symbol, setSymbol] = useState("BTCUSDT");

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar setSymbol={setSymbol} />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">

        <PriceTicker symbol={symbol} />

        {/* Chart */}
        <Chart symbol={symbol} />

        {/* Panels */}
        <div className="grid grid-cols-3 gap-4">
          <SignalPanel symbol={symbol} />
          <TradePanel symbol={symbol} />
          <Portfolio />
        </div>

      </div>
    </div>
  );
}
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Chart from "./components/Chart";
import PriceTicker from "./components/PriceTicker";

import SignalPanel from "./components/SignalPanel";
import TradePanel from "./components/TradePanel";
import Portfolio from "./components/Portfolio";
import StatsPanel from "./components/StatsPanel";
import TradeHistory from "./components/TradeHistory";

export default function Home() {
  const symbol = "BTCUSDT";

  return (
    <div className="flex bg-black min-h-screen text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* Price Ticker */}
          <PriceTicker symbol={symbol} />

          {/* Chart */}
          <Chart symbol={symbol} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Portfolio />
            <StatsPanel />
            <SignalPanel symbol={symbol} />
            <TradePanel symbol={symbol} />
          </div>

          {/* Trade History */}
          <TradeHistory />

        </div>
      </main>
    </div>
  );
}
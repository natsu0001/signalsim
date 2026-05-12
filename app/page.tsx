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

export default function Home() {
  const symbol = "BTCUSDT";

  return (
    <div className="flex bg-black min-h-screen text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden ml-64">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 space-y-6 overflow-y-auto w-full">

          {/* Price Ticker */}
          <PriceTicker symbol={symbol} />

<div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

  {/* LEFT SIDE */}
  <div className="xl:col-span-3 space-y-6">

    {/* Chart */}
    <Chart symbol={symbol} />

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Portfolio />
      <StatsPanel />
      <SignalPanel symbol={symbol} />
      <TradePanel symbol={symbol} />
    </div>

    {/* Trade History */}
    <TradeHistory />

  </div>

  {/* RIGHT SIDE */}
  <div className="sticky top-6 h-fit">
    <Watchlist />
  </div>

</div>

        </div>
      </main>
    </div>
  );
}
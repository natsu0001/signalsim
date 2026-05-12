"use client";

import DashboardCard from "./cards/DashboardCard";

const watchlist = [
  {
    symbol: "BTCUSDT",
    price: "82,140",
    change: "+2.1%",
  },
  {
    symbol: "ETHUSDT",
    price: "3,120",
    change: "+1.4%",
  },
  {
    symbol: "BNBUSDT",
    price: "640",
    change: "-0.8%",
  },
  {
    symbol: "SOLUSDT",
    price: "182",
    change: "+4.3%",
  },
];

export default function Watchlist() {
  return (
    <DashboardCard>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">
            Watchlist
          </h2>

          <p className="text-zinc-400 text-sm">
            Market overview
          </p>
        </div>
      </div>

      <div className="space-y-3">

        {watchlist.map((item) => (
          <button
            key={item.symbol}
            className="
              w-full
              flex items-center justify-between
              bg-zinc-900/60
              hover:bg-zinc-800/70
              transition
              border border-zinc-800
              rounded-xl
              p-3
            "
          >
            <div className="text-left">
              <p className="font-medium">
                {item.symbol}
              </p>

              <p className="text-zinc-500 text-xs">
                Crypto
              </p>
            </div>

            <div className="text-right">
              <p>{item.price}</p>

              <p
                className={`text-xs ${
                  item.change.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.change}
              </p>
            </div>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
}
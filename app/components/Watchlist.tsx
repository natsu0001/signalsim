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

export default function Watchlist({
  symbol,
  setSymbol,
}: {
  symbol: string;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
}) {
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

        {watchlist.map((item) => {
          const isActive = symbol === item.symbol;

          return (
            <button
              key={item.symbol}
              onClick={() => setSymbol(item.symbol)}
              className={`
                w-full
                flex items-center justify-between
                transition-all duration-200
                border
                rounded-xl
                p-3
                ${
                  isActive
                     
                    ? `
                      bg-green-500/10
                      border-green-500/30
                        scale-[1.02]
                        shadow-lg shadow-green-500/10
                      `
                    : "bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/70"
                }
              `}
            >
              <div className="text-left">
                <p
                   className={`
                   font-medium transition
                  ${
                    isActive
                    ? "text-green-400"
                    : "text-white"
                      }
                     `}
                >
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
          );
        })}
      </div>
    </DashboardCard>
  );
}
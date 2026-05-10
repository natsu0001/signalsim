"use client";

import {
  LayoutDashboard,
  Wallet,
  LineChart,
  History,
  Settings,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Portfolio",
    icon: Wallet,
  },
  {
    name: "Signals",
    icon: LineChart,
  },
  {
    name: "History",
    icon: History,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-4 hidden md:flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          SignalSim
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Trading Simulator
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-sm text-zinc-400">
            Signal Engine
          </p>

          <p className="text-green-400 font-semibold mt-1">
            ACTIVE
          </p>
        </div>
      </div>
    </aside>
  );
}
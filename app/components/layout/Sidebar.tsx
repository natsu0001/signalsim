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
    active: true,
  },
  {
    name: "Portfolio",
    icon: Wallet,
    active: false,
  },
  {
    name: "Signals",
    icon: LineChart,
    active: false,
  },
  {
    name: "History",
    icon: History,
    active: false,
  },
  {
    name: "Settings",
    icon: Settings,
    active: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="
    fixed left-0 top-0
    w-64 h-screen
    bg-zinc-950/70
    backdrop-blur-xl
    border-r border-zinc-800
    p-4
    hidden md:flex flex-col
    z-50
  ">
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
              className={`
  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
  ${
    item.active
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
  }
`}
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
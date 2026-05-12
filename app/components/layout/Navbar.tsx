"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6">
      <div>
  <h2 className="text-white text-2xl font-bold tracking-tight">
    Trading Dashboard
  </h2>

  <p className="text-zinc-400 text-sm">
    AI-powered signal simulator
  </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
          <Search size={16} className="text-zinc-500" />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm ml-2 text-white"
          />
        </div>

        <button className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl hover:bg-zinc-800 transition">
          <Bell size={18} className="text-zinc-300" />
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
      </div>
    </header>
  );
}
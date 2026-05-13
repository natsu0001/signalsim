"use client";

type NavbarProps = {
  symbol: string;
};

export default function Navbar({
  symbol,
}: NavbarProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        backdrop-blur-xl
        bg-black/40
        border-b border-zinc-800
      "
    >
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            Real-time trading simulator
          </p>
        </div>

        {/* Active Symbol */}
        <div
          className="
            flex items-center gap-3
            bg-zinc-900/70
            border border-green-500/20
            rounded-2xl
            px-4 py-2
          "
        >

          {/* Live Dot */}
          <div className="relative">

            <div className="w-3 h-3 rounded-full bg-green-400" />

            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              Active Market
            </p>

            <p className="font-semibold text-green-400">
              {symbol}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
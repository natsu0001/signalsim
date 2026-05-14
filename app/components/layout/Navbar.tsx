"use client";

import { Menu, Bell, Search } from "lucide-react";
import { useMarketStore } from "../../store/useMarketStore";

type NavbarProps = {
  sidebarOpen: boolean;

  setSidebarOpen:
    React.Dispatch<
      React.SetStateAction<boolean>
    >;
};

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  const { symbol } = useMarketStore();

  return (
    <header
      className="
        sticky top-0 z-40
        backdrop-blur-xl
        bg-black/40
        border-b border-zinc-800
      "
    >
      <div
        className="
          px-4 md:px-6 py-4
          flex items-center justify-between
          gap-4
        "
      >

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="
              xl:hidden
              w-10 h-10
              rounded-xl
              border border-zinc-800
              bg-zinc-900/70
              flex items-center justify-center
              hover:bg-zinc-800
              transition
            "
          >
            <Menu size={20} />
          </button>

          {/* Title */}
          <div>
            <h1
              className="
                text-xl md:text-2xl
                font-bold tracking-tight
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-zinc-500 text-xs md:text-sm
                mt-1 hidden sm:block
              "
            >
              Real-time trading simulator
            </p>
          </div>

        </div>

        {/* CENTER */}
        <div
          className="
            hidden lg:flex
            items-center
            bg-zinc-900/70
            border border-zinc-800
            rounded-2xl
            px-4 py-2
            w-[320px]
          "
        >
          <Search
            size={18}
            className="text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search market..."
            className="
              bg-transparent
              outline-none
              px-3
              text-sm
              w-full
              placeholder:text-zinc-500
            "
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button
            className="
              relative
              w-11 h-11
              rounded-2xl
              border border-zinc-800
              bg-zinc-900/70
              flex items-center justify-center
              hover:bg-zinc-800
              transition
            "
          >
            <Bell size={18} />

            <div
              className="
                absolute top-2 right-2
                w-2 h-2 rounded-full
                bg-green-400
              "
            />
          </button>

          {/* Active Symbol */}
          <div
            className="
              flex items-center gap-3
              bg-zinc-900/70
              border border-green-500/20
              rounded-2xl
              px-4 py-2
              shadow-lg shadow-green-500/5
            "
          >

            {/* Live Dot */}
            <div className="relative">

              <div
                className="
                  w-3 h-3
                  rounded-full
                  bg-green-400
                "
              />

              <div
                className="
                  absolute inset-0
                  rounded-full
                  bg-green-400
                  animate-ping
                  opacity-60
                "
              />
            </div>

            {/* Symbol */}
            <div>
              <p
                className="
                  text-[10px]
                  uppercase tracking-wider
                  text-zinc-500
                "
              >
                Active Market
              </p>

              <p
                className="
                  font-semibold
                  text-green-400
                  text-sm md:text-base
                "
              >
                {symbol}
              </p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const navItems = [
  "Dashboard",
  "Portfolio",
  "Trades",
  "Signals",
  "Settings",
];

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden lg:flex
          fixed left-0 top-0
          h-screen w-64
          bg-zinc-950
          border-r border-zinc-800
          flex-col
          p-6
          z-40
        "
      >

        <h1
          className="
            text-2xl font-bold
            text-green-400
            mb-10
          "
        >
          SIGSIM
        </h1>

        <nav className="space-y-2">

          {navItems.map((item) => (
            <button
              key={item}
              className="
                w-full text-left
                px-4 py-3
                rounded-xl
                text-zinc-400
                hover:bg-zinc-900
                hover:text-white
                transition
              "
            >
              {item}
            </button>
          ))}

        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>

        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}

              onClick={() =>
                setOpen(false)
              }

              className="
                fixed inset-0
                bg-black/60
                backdrop-blur-sm
                z-40
                lg:hidden
              "
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}

              transition={{
                type: "spring",
                damping: 25,
              }}

              className="
                fixed left-0 top-0
                h-screen w-64
                bg-zinc-950
                border-r border-zinc-800
                p-6
                z-50
                lg:hidden
              "
            >

              <h1
                className="
                  text-2xl font-bold
                  text-green-400
                  mb-10
                "
              >
                SIGSIM
              </h1>

              <nav className="space-y-2">

                {navItems.map((item) => (
                  <button
                    key={item}

                    onClick={() =>
                      setOpen(false)
                    }

                    className="
                      w-full text-left
                      px-4 py-3
                      rounded-xl
                      text-zinc-400
                      hover:bg-zinc-900
                      hover:text-white
                      transition
                    "
                  >
                    {item}
                  </button>
                ))}

              </nav>

            </motion.aside>
          </>
        )}

      </AnimatePresence>
    </>
  );
}
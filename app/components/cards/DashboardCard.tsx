"use client";

import { motion } from "framer-motion";

export default function DashboardCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-zinc-900/70
        backdrop-blur-xl
        border border-zinc-800
        rounded-2xl
        p-4 md:p-6
        shadow-[0_0_40px_rgba(0,0,0,0.35)]
        hover:border-zinc-700
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
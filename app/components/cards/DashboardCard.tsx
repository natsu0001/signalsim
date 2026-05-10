"use client";

import { motion } from "framer-motion";

export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-xl"
    >
      {children}
    </motion.div>
  );
}
"use client";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
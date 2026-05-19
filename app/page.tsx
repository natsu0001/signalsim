"use client";

import Sidebar from "./components/layout/Sidebar";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Sidebar
        open={false}
        setOpen={() => {}}
      />
    </div>
  );
}
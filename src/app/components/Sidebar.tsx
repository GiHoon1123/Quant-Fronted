"use client";

import { Bitcoin, BookText, DollarSign, RefreshCcw } from "lucide-react";

export default function Sidebar({
  onPanelToggle,
}: {
  onPanelToggle: () => void;
}) {
  return (
    <aside className="fixed top-0 right-0 h-screen w-16 flex flex-col items-center border-l-2 border-white/50 bg-black text-white shadow-lg z-50">
      <div className="mt-8 flex flex-col items-center space-y-6">
        <button
          onClick={onPanelToggle}
          className="hover:text-gray-300"
          title="지수"
        >
          <BookText size={28} />
        </button>
        <button className="hover:text-gray-300" title="코인">
          <Bitcoin size={28} />
        </button>
        <button className="hover:text-gray-300" title="환율">
          <DollarSign size={28} />
        </button>
        <button className="hover:text-gray-300" title="전환">
          <RefreshCcw size={28} />
        </button>
      </div>
    </aside>
  );
}

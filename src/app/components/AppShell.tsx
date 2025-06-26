"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SlidePanel from "./SlidePanel";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 슬라이드 상태

  return (
    <>
      <Sidebar onPanelToggle={() => setPanelOpen(!panelOpen)} />

      <SlidePanel isOpen={panelOpen} />

      <div
        className={`transition-all duration-300 ${panelOpen ? "mr-64" : ""}`}
      >
        <Header
          isMenuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((prev) => !prev)}
        />
        <main className="pr-16 pt-4">{children}</main>
      </div>
    </>
  );
}

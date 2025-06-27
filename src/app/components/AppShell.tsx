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
        <main
          className="pr-Prettier pt-4"
          style={{
            backgroundImage: "url('/assets/robot.png')",
            backgroundPosition: "center", // 중앙 배치
            backgroundRepeat: "no-repeat", // 반복되지 않게 설정
            backgroundSize: "cover", // 부모 요소를 덮도록 크기 조정
            height: "100vh", // 화면 전체 크기
            width: "50vw", // 화면 가로 크기의 50%로 설정
            margin: "0 auto", // 화면 중앙 정렬
            transform: "scale(0.5)", // 이미지 크기 50%로 줄이기
            transformOrigin: "center", // 이미지가 중앙에서 축소되도록 설정
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

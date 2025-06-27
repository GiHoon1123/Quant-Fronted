"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export default function Header({ isMenuOpen, onToggleMenu }: Props) {
  return (
    <header className="relative grid grid-cols-3 items-center px-4 py-3 pr-20 text-lg font-medium text-white">
      {/* 왼쪽: 로고 */}
      <Link
        href="/"
        className="flex items-center space-x-2 text-2xl font-bold whitespace-nowrap hover:opacity-80 transition"
      >
        <Image src="/assets/qb.png" width={48} height={48} alt="QB Logo" />
      </Link>

      {/* 가운데: 메뉴 */}
      <nav className="flex justify-center space-x-8 whitespace-nowrap relative">
        <div
          className="relative z-10"
          onMouseEnter={onToggleMenu}
          onMouseLeave={() => setTimeout(onToggleMenu, 100)}
        >
          <span className="hover:text-gray-300 cursor-pointer">프로덕트</span>

          {/* 드롭다운 메뉴 */}
          {isMenuOpen && (
            <div
              className="absolute left-1/2 top-full w-48 bg-gray-800 rounded shadow-lg z-50 transition-opacity duration-200"
              style={{
                transform: "translateX(-50%)",
                marginTop: "4px",
              }}
            >
              <ul className="p-2 space-y-2">
                <li>
                  <Link
                    href="/btc"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    BTC/Bot
                  </Link>
                </li>
                <li>
                  <Link
                    href="/eth"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    ETH/Bot
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sol"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    SOL/Bot
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link href="#" className="hover:text-gray-300">
          마켓
        </Link>
        <Link href="#" className="hover:text-gray-300">
          커뮤니티
        </Link>
        <Link href="#" className="hover:text-gray-300">
          더보기
        </Link>
      </nav>

      {/* 오른쪽: 로그인/회원가입 */}
      <div className="flex justify-end space-x-4 pr-30">
        {" "}
        {/* ← 여기 pr-20 추가로 Sidebar 피하기 */}
        <Link href="/login" className="hover:text-gray-300">
          로그인
        </Link>
        <Link href="/register" className="hover:text-gray-300">
          회원가입
        </Link>
      </div>
    </header>
  );
}

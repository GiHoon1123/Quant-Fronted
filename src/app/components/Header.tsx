"use client";

import Link from "next/link";

type Props = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export default function Header({ isMenuOpen, onToggleMenu }: Props) {
  return (
    <header className="grid grid-cols-3 items-center px-4 py-3 pr-20">
      {/* 왼쪽: 로고 */}
      <Link
        href="/"
        className="text-2xl font-bold whitespace-nowrap hover:opacity-80 transition"
      >
        QuantBot
      </Link>

      {/* 가운데: 메뉴 */}
      <nav className="flex justify-center space-x-8 text-lg font-medium whitespace-nowrap relative">
        <div
          className="relative z-10"
          onMouseEnter={onToggleMenu}
          onMouseLeave={() => setTimeout(onToggleMenu, 100)}
        >
          <span className="hover:text-gray-300 cursor-pointer">프로덕트</span>

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
      <div
        className={`absolute left-1/2 top-full w-48 bg-gray-800 rounded shadow-lg z-50 transition-opacity duration-200 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        style={{
          transform: "translateX(-50%)",
          marginTop: "4px",
        }}
      >
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

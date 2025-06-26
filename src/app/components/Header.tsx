export default function Header() {
  return (
    <header className="relative flex items-center justify-center px-4 py-3">
      {/* 왼쪽 고정 로고 */}
      <div className="absolute left-4 text-2xl font-bold whitespace-nowrap">
        QuantBot
      </div>

      {/* 중앙 정렬 메뉴 */}
      <nav className="flex space-x-8 text-lg font-medium whitespace-nowrap">
        <a href="#" className="hover:text-gray-300">
          프로덕트
        </a>
        <a href="#" className="hover:text-gray-300">
          커뮤니티
        </a>
        <a href="#" className="hover:text-gray-300">
          마켓
        </a>
        <a href="#" className="hover:text-gray-300">
          더보기
        </a>
      </nav>
    </header>
  );
}

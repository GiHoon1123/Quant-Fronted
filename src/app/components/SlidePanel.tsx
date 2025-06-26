"use client";

export default function SlidePanel({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-64 bg-gray-800 border-l border-white z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">Temp</div>
    </div>
  );
}

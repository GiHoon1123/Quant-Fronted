"use client";

import TradeList from "./components/TradeList";
import { useTradeSocket } from "./hooks/useTradeSocket";

export default function Home() {
  const trades = useTradeSocket();

  return (
    <main>
      <h1>Bitcoin Trade Ticker (Live)</h1>
      <TradeList trades={trades} />
    </main>
  );
}

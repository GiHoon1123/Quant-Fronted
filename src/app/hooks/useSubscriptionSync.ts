"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Kline } from "../types/kline";
import { Trade } from "../types/trade";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

type UseSubscriptionSyncProps = {
  socket: Socket;
  onTrade?: (symbol: string, data: Trade) => void;
  onKline?: (symbol: string, data: Kline) => void;
};

export function useSubscriptionSync({
  socket,
  onTrade,
  onKline,
}: UseSubscriptionSyncProps) {
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const activeRef = useRef<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false); // ✅ 중복 방지용

  activeRef.current = activeSymbols;

  useEffect(() => {
    if (hasInitializedRef.current) return; // 이미 실행되었으면 무시
    hasInitializedRef.current = true;

    const sync = async () => {
      console.log("📡 [useSubscriptionSync] 심볼 동기화 시작");
      console.log("✅ ENV:", process.env.NEXT_PUBLIC_BACKEND_API_URL);

      try {
        const fullUrl = new URL(
          "market-data/watchlist",
          process.env.NEXT_PUBLIC_BACKEND_API_URL!
        ).toString();
        console.log("🔗 요청 URL:", fullUrl);
        const res = await axios.get(fullUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log("📡 [useSubscriptionSync] 심볼 동기화 완료", res.data);
        console.log("BACKEND_API_URL", process.env.NEXT_PUBLIC_BACKEND_API_URL);
        const newSymbols: string[] = res.data.data.symbols;

        const added = newSymbols.filter((s) => !activeRef.current.includes(s));
        const removed = activeRef.current.filter(
          (s) => !newSymbols.includes(s)
        );

        removed.forEach((symbol) => {
          socket.off(`trade:${symbol}`);
          socket.off(`kline:${symbol}`);
        });

        added.forEach((symbol) => {
          if (onTrade) {
            socket.on(`trade:${symbol}`, (data: Trade) => {
              onTrade(symbol, data);
            });
          }
          if (onKline) {
            socket.on(`kline:${symbol}`, (data: Kline) => {
              onKline(symbol, data);
            });
          }
        });

        setActiveSymbols(newSymbols);
      } catch (err) {
        console.error("❌ 구독 목록 동기화 실패", err);
      }
    };

    sync();
    intervalRef.current = setInterval(sync, 10000); // ✅ 10초마다 실행

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [socket, onTrade, onKline]);
}

"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { Kline } from "../types/kline";
import { Trade } from "../types/trade";

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
  activeRef.current = activeSymbols;

  useEffect(() => {
    const sync = async () => {
      console.log("📡 [useSubscriptionSync] 심볼 동기화 시작");

      try {
        const res = await axios.get(
          "http://localhost:3000/market-data/trade/subscribed"
        );
        const newSymbols: string[] = res.data.data;

        console.log("✅ [서버 응답] 구독 중인 심볼 목록:", newSymbols);

        const added = newSymbols.filter((s) => !activeRef.current.includes(s));
        const removed = activeRef.current.filter(
          (s) => !newSymbols.includes(s)
        );

        console.log("➕ 새로 추가된 심볼:", added);
        console.log("➖ 제거된 심볼:", removed);

        removed.forEach((symbol) => {
          console.log(`⛔ 소켓 off: ${symbol}`);
          socket.off(`trade:${symbol}`);
          socket.off(`kline:${symbol}`);
        });

        added.forEach((symbol) => {
          if (onTrade) {
            socket.on(`trade:${symbol}`, (data: Trade) => {
              console.log(`📥 [소켓 수신 - trade:${symbol}]`, data);
              onTrade(symbol, data);
            });
          }
          if (onKline) {
            socket.on(`kline:${symbol}`, (data: Kline) => {
              console.log(`📥 [소켓 수신 - kline:${symbol}]`, data);
              onKline(symbol, data);
            });
          }
          console.log(`✅ 소켓 on: ${symbol}`);
        });

        setActiveSymbols(newSymbols);
        console.log("✅ [상태 갱신] 현재 활성 심볼 목록:", newSymbols);
      } catch (err) {
        console.error("❌ 구독 목록 동기화 실패", err);
      }
    };

    sync();
    const interval = setInterval(sync, 10000);
    return () => clearInterval(interval);
  }, [socket, onTrade, onKline]);
}

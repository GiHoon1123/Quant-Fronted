"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Trade } from "../types/trade";

export const useTradeSocket = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => console.log("✅ 연결됨"));
    socket.on("trade", (data: Trade) => {
      setTrades((prev) => [data, ...prev.slice(0, 20)]);
    });
    socket.on("disconnect", () => console.log("❌ 연결 종료"));

    return () => {
      socket.disconnect();
    };
  }, []);

  return trades;
};

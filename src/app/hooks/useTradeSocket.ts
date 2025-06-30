"use client";
import { getSocket } from "@/common/socket";
import { useEffect, useState } from "react";
import { Trade } from "../types/trade";

export const useTradeSocket = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleTrade = (data: Trade) => {
      console.log("📥 [소켓 수신 - trade]", data);
      setTrades((prev) => [data, ...prev.slice(0, 20)]);
    };

    socket.on("connect", () => console.log("✅ 연결됨"));
    socket.on("trade", handleTrade);
    socket.on("disconnect", () => console.log("❌ 연결 종료"));

    return () => {
      socket.off("trade", handleTrade);
    };
  }, []);

  return trades;
};

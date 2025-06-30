"use client";

import axios from "axios";
import { CandlestickData, Time } from "lightweight-charts";
import { useEffect, useState } from "react";

import { getSocket } from "@/common/socket";
import BtcKlineChart from "../components/BtcKlineChart";
import BtcTradeList from "../components/BtcTradeList";
import { useSubscriptionSync } from "../hooks/useSubscriptionSync";
import { Kline } from "../types/kline";
import { Trade } from "../types/trade";
import { toCandleData } from "../utils/toCandleData";

type Candle = CandlestickData<Time>;

export default function BtcPage() {
  const [buyTrades, setBuyTrades] = useState<Trade[]>([]);
  const [sellTrades, setSellTrades] = useState<Trade[]>([]);
  const [klines, setKlines] = useState<Candle[]>([]);

  const socket = getSocket(); // ✅ singleton으로 사용

  // ✅ 초기 1분봉 데이터 로딩
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await axios.get("https://api.binance.com/api/v3/klines", {
          params: {
            symbol: "BTCUSDT",
            interval: "1m",
            limit: 400,
          },
        });

        const initial = res.data.map(
          (k: [number, string, string, string, string]) => ({
            time: Math.floor(k[0] / 1000) as Time,
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
          })
        );

        setKlines(initial);
      } catch (err) {
        console.error("초기 Kline 데이터 불러오기 실패", err);
      }
    };

    fetchInitial();
  }, []);

  // ✅ 실시간 소켓 데이터 연결
  useSubscriptionSync({
    socket,
    onTrade: (_symbol, trade) => {
      if (trade.isBuyerMaker) {
        setSellTrades((prev) => [...prev, trade].slice(-20));
      } else {
        setBuyTrades((prev) => [...prev, trade].slice(-20));
      }
    },
    onKline: (_symbol, kline: Kline) => {
      const candle = toCandleData(kline);
      setKlines((prev) => {
        const updated = [...prev];
        const last = updated.at(-1);
        const candleWithTime = { ...candle, time: candle.time as Time };

        if (last && last.time === candleWithTime.time) {
          updated[updated.length - 1] = candleWithTime;
        } else {
          updated.push(candleWithTime);
        }

        return updated.slice(-100);
      });
    },
  });

  return (
    <main className="main-layout">
      <section className="trade-section">
        <h1>Bitcoin Trade Ticker (Live)</h1>
        <BtcTradeList buyTrades={buyTrades} sellTrades={sellTrades} />
      </section>
      <section className="chart-section">
        <h1>BTC/USDT</h1>
        <BtcKlineChart klineData={klines} />
      </section>
    </main>
  );
}

"use client";

import {
  CandlestickData,
  createChart,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

type Candle = CandlestickData<Time>;

type Props = {
  klineData: Candle[];
};

export default function BtcKlineChart({ klineData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ReturnType<
    IChartApi["addCandlestickSeries"]
  > | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: 700,
      height: 400,
      layout: {
        background: { color: "#111" },
        textColor: "#eee",
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;
    seriesRef.current = chart.addCandlestickSeries();

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;

    // ✅ 중복된 time은 덮어씌우고, 오름차순 정렬, 최신 100개 유지
    const map = new Map<number, Candle>();
    for (const candle of klineData) {
      map.set(Number(candle.time), candle);
    }

    const sorted = Array.from(map.values()).sort(
      (a, b) => Number(a.time) - Number(b.time)
    );

    seriesRef.current.setData(sorted.slice(-100));
  }, [klineData]);

  return <div ref={containerRef} />;
}

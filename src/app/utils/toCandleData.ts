// app/utils/toCandleData.ts

import { Kline } from "../types/kline";

export function toCandleData(kline: Kline) {
  return {
    time: Math.floor(kline.openTimestamp / 1000), // ⏱ lightweight-charts는 초 단위
    open: kline.openPrice,
    high: kline.highPrice,
    low: kline.lowPrice,
    close: kline.closePrice,
  };
}

// app/types/trade.ts

export type Trade = {
  eventType: string; // 거래 이벤트 유형 (예: "trade")
  eventTime: number; // 이벤트 시간 (ms timestamp)
  symbol: string; // 심볼 (예: "BTCUSDT")
  tradeId: number; // 트레이드 ID
  price: number; // 체결 가격
  quantity: number; // 체결 수량
  tradeTime: number; // 체결 시간 (timestamp)
  isBuyerMaker: boolean; // 매도자 주도 체결 여부
};

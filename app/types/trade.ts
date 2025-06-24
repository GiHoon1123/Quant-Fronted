// app/types/trade.ts

// ✅ app/types/trade.ts
export type Trade = {
  eventType: string;
  eventTime: number;
  symbol: string;
  tradeId: number;
  price: number;
  quantity: number;
  tradeTime: number;
  isBuyerMaker: boolean;
};

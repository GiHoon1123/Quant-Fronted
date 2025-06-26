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

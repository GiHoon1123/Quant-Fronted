import { Trade } from "../types/trade";

export function getAverages(trades: Trade[]) {
  if (trades.length === 0) return { avgPrice: 0, avgQty: 0 };

  const totalPrice = trades.reduce((sum, t) => sum + Number(t.price), 0);
  const totalQty = trades.reduce((sum, t) => sum + Number(t.quantity), 0);

  return {
    avgPrice: totalPrice / trades.length,
    avgQty: totalQty / trades.length,
  };
}

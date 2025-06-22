"use client";

import { Trade } from "../types/trade";
import styles from "./TradeList.module.css";

type Props = {
  trades: Trade[];
};

export default function TradeList({ trades }: Props) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {trades.map((trade, idx) => (
        <li key={idx} className={styles.tradeItem}>
          <span className={styles.colPrice}>
            Price: <strong style={{ color: "#00ffae" }}>{trade.price}</strong>
          </span>
          <span className={styles.colQuantity}>Quantity: {trade.quantity}</span>
          <span className={styles.colTime}>
            Time: {new Date(trade.tradeTime).toLocaleTimeString()}
          </span>
          <span className={styles.colType}>
            Type: {trade.isBuyerMaker ? "Market Buy" : "Market Sell"}
          </span>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { Trade } from "../types/trade";
import styles from "./BtcTradeList.module.css";

type Props = {
  buyTrades: Trade[];
  sellTrades: Trade[];
};

const MAX_ROWS = 20;

function paddedList(list: Trade[]): (Trade | null)[] {
  const emptyCount = Math.max(0, MAX_ROWS - list.length);
  return [...Array(emptyCount).fill(null), ...list];
}

export default function BtcTradeList({ buyTrades, sellTrades }: Props) {
  return (
    <div className={styles.splitContainer}>
      {/* Sell Section */}
      <div className={styles.sellSection}>
        <h3 className={styles.sectionTitle}>Sell</h3>
        <ul>
          {paddedList(sellTrades).map((trade, idx) =>
            trade ? (
              <li key={idx} className={`${styles.tradeItem} ${styles.red}`}>
                <span className={styles.colPrice} style={{ textAlign: "left" }}>
                  <span style={{ color: "white" }}>Price:</span> {trade.price}
                </span>
                <span
                  className={styles.colQuantity}
                  style={{ textAlign: "left" }}
                >
                  <span style={{ color: "white" }}>Qty:</span>

                  {trade.quantity}
                </span>
                <span className={styles.colTime} style={{ textAlign: "left" }}>
                  <span style={{ color: "white" }}>Time:</span>
                  {new Date(trade.tradeTime).toLocaleTimeString()}
                </span>
                <span className={styles.colType}>Sell</span>
              </li>
            ) : (
              <li key={idx} className={styles.tradeItemEmpty}></li>
            )
          )}
        </ul>
      </div>

      {/* Buy Section */}
      <div className={styles.buySection}>
        <h3 className={styles.sectionTitle}>Buy</h3>
        <ul>
          {paddedList(buyTrades).map((trade, idx) =>
            trade ? (
              <li key={idx} className={`${styles.tradeItem} ${styles.green}`}>
                <span className={styles.colPrice} style={{ textAlign: "left" }}>
                  <span style={{ color: "white" }}> Price:</span> {trade.price}
                </span>
                <span
                  className={styles.colQuantity}
                  style={{ textAlign: "left" }}
                >
                  <span style={{ color: "white" }}> Qty:</span>:{" "}
                  {trade.quantity}
                </span>
                <span className={styles.colTime} style={{ textAlign: "left" }}>
                  <span style={{ color: "white" }}> Time:</span>
                  {new Date(trade.tradeTime).toLocaleTimeString()}
                </span>
                <span className={styles.colType}>Buy</span>
              </li>
            ) : (
              <li key={idx} className={styles.tradeItemEmpty}></li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

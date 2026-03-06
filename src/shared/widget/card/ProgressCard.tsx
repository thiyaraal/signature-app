import React from "react";
import styles from "./progress-card.module.css";
interface ProgressCardProps {
  icon: React.ReactNode;
  amount: string;
  title: string;
  cardColor?: string;
  borderColor?: string;
  iconColor?: string;
}

export function ProgressCard({
  icon,
  amount,
  title,
  cardColor,
  borderColor,
  iconColor,
}: ProgressCardProps) {
  return (
    <div
      className={styles.progressCard}
      style={{
        backgroundColor: cardColor,
        borderColor: borderColor,
      }}
    >
      <div className={styles.progressCardIcon} style={{ color: iconColor }}>
        {icon}
      </div>

      <p className={styles.amount}>{amount}</p>
      <p className={styles.titleCard}>{title}</p>
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./Tooltip.module.css";

export default function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <div className={styles.base}>
      {children}
      <span className={styles.text}>{text}</span>
    </div>
  );
}

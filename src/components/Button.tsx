import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "white",
  size = "medium",
  roundedFull = false,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "purple" | "white" | "error" | "success" | "warning" | "neutral";
  size?: "small" | "medium";
  roundedFull?: boolean;
}) {
  return (
    <button
      className={`${styles.base} ${styles[variant]} ${styles[size]} ${
        roundedFull ? styles.roundedFull : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  className,
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
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

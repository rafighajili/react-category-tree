import { cloneElement, ReactElement, useState } from "react";
import styles from "./Popover.module.css";
import useOutsideClick from "../hooks/useClickOutside.tsx";

export default function Popover({
  children,
}: {
  children: [
    ReactElement,
    ReactElement | ((close: () => void) => ReactElement),
  ];
}) {
  const [actionButton, content] = children;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <div ref={ref} className={styles.base}>
      {cloneElement(actionButton, {
        onClick: () => setIsOpen((prev) => !prev),
      })}

      {isOpen && (
        <div className={styles.content}>
          {typeof content === "function"
            ? content(() => setIsOpen(false))
            : content}
        </div>
      )}
    </div>
  );
}

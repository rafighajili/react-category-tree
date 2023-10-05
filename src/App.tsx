import { MouseEvent, useContext, useState } from "react";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import buildCategoriesTree from "./utils/buildCategoriesTree.ts";
import CategoryContext from "./context/CategoryProvider.tsx";
import Category from "./components/Category.tsx";
import Button from "./components/Button.tsx";

type Dimensions = { x: number; y: number };

export default function App() {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Dimensions>({ x: 0, y: 0 });

  const { data } = useContext(CategoryContext);

  const centerContainer = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className={styles.base}>
      <Navbar {...{ zoomLevel, setZoomLevel, centerContainer }} />

      <div
        className={styles.container}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <div
          className={styles.categories}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            scale: `${zoomLevel / 100}`,
            transitionDuration: dragging ? "0ms" : "400ms",
          }}
        >
          <Category {...buildCategoriesTree(data)[0]} />
        </div>

        <Button
          className={styles.top}
          onClick={() =>
            setPosition((prev) => ({
              ...prev,
              y: prev.y - 100,
            }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </Button>

        <Button
          className={styles.right}
          onClick={() =>
            setPosition((prev) => ({
              ...prev,
              x: prev.x + 100,
            }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>

        <Button
          className={styles.bottom}
          onClick={() =>
            setPosition((prev) => ({
              ...prev,
              y: prev.y + 100,
            }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </Button>

        <Button
          className={styles.left}
          onClick={() =>
            setPosition((prev) => ({
              ...prev,
              x: prev.x - 100,
            }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

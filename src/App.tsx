import { MouseEvent, useContext, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import buildCategoriesTree from "./utils/buildCategoriesTree.ts";
import CategoryContext from "./context/CategoryProvider.tsx";
import Category from "./components/Category.tsx";

type Dimensions = { x: number; y: number };

export default function App() {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [dragging, setDragging] = useState<boolean>(false);
  const [translate, setTranslate] = useState<Dimensions>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Dimensions>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef(null);

  const { data } = useContext(CategoryContext);

  const centerContainer = () => setTranslate({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setTranslate({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className={styles.base}>
      <Navbar {...{ zoomLevel, setZoomLevel, centerContainer }} />

      <div className={styles.container}>
        <div
          ref={containerRef}
          className={styles.categories}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)`,
            scale: `${zoomLevel / 100}`,
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Category {...buildCategoriesTree(data)[0]} />
        </div>
      </div>
    </div>
  );
}

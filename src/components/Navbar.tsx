import Button from "./Button";
import styles from "./Navbar.module.css";
import Tooltip from "./Tooltip";
import Popover from "./Popover.tsx";
import { Dispatch, SetStateAction } from "react";

const zoomLevels = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

export default function Navbar({
  zoomLevel,
  setZoomLevel,
  centerContainer,
}: {
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  centerContainer: () => void;
}) {
  const changeZoomLevel = (level: number, close: () => void) => {
    setZoomLevel(level);
    close();
  };

  return (
    <nav className={styles.base}>
      <span className={styles.logo}>Category Tree</span>

      <div className={styles.actions}>
        <Tooltip text="Center the categories">
          <Button variant="purple" onClick={centerContainer}>
            Center
          </Button>
        </Tooltip>

        <div className={styles.zoom}>
          <Tooltip text="Zoom out">
            <Button
              onClick={() => {
                if (zoomLevels.indexOf(zoomLevel) !== 0) {
                  setZoomLevel(zoomLevels[zoomLevels.indexOf(zoomLevel) - 1]);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Tooltip>

          <Popover>
            <Button>{zoomLevel}%</Button>

            {(close) => (
              <div className={styles.zoomLevels}>
                {zoomLevels.map((level) => (
                  <Button
                    key={level}
                    onClick={() => changeZoomLevel(level, close)}
                    variant={zoomLevel === level ? "purple" : "white"}
                  >
                    {level}%
                  </Button>
                ))}
              </div>
            )}
          </Popover>

          <Tooltip text="Zoom in">
            <Button
              onClick={() => {
                if (zoomLevels.indexOf(zoomLevel) !== zoomLevels.length - 1) {
                  setZoomLevel(zoomLevels[zoomLevels.indexOf(zoomLevel) + 1]);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}

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
        <Button variant="purple">List view</Button>

        <Tooltip text="Center the categories">
          <Button onClick={centerContainer}>
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
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
              />
            </svg>
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
                    style={{
                      width: "100px",
                      justifyContent: "start",
                      padding: "0 24px",
                    }}
                  >
                    <span>{level}%</span>

                    {zoomLevel === level && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        style={{
                          height: "16px",
                          width: "16px",
                          marginLeft: "4px",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
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

"use client";

import { useMemo, useState } from "react";

export default function PixelButton({
  children = "HOVER ME",
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const pixels = useMemo(() => {
    return Array.from({ length: 90 }, (_, index) => {
      const columns = 15;
      const row = Math.floor(index / columns);
      const column = index % columns;

      // Keep the movement pixel-like and consistent
      const xDirection = column < 7 ? -1 : 1;
      const yDirection = row < 3 ? -1 : 1;

      const distanceX = 20 + Math.random() * 45;
      const distanceY = 15 + Math.random() * 40;

      return {
        id: index,
        column,
        row,
        x: xDirection * distanceX,
        y: yDirection * distanceY,
        delay: Math.random() * 0.18,
      };
    });
  }, []);

  return (
    <div className="pixel-button-wrapper">
      <button
        className={`pixel-button ${isHovered ? "breaking" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Pixel blocks */}
        <span className="pixel-grid">
          {pixels.map((pixel) => (
            <span
              key={pixel.id}
              className="pixel"
              style={{
                "--x": `${pixel.x}px`,
                "--y": `${pixel.y}px`,
                "--delay": `${pixel.delay}s`,
              }}
            />
          ))}
        </span>

        {/* Text */}
        <span className="pixel-text">{children}</span>
      </button>

      <style jsx>{`
        .pixel-button-wrapper {
          position: relative;
          display: inline-block;
          padding: 40px;
        }

        .pixel-button {
          position: relative;

          width: 200px;
          height: 64px;

          border: none;
          outline: none;
          cursor: pointer;

          /* bg-blue-500 */
          background: #3b82f6;

          /* text-white */
          color: white;

          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;

          overflow: visible;

          transition:
            background-color 0.25s ease,
            color 0.25s ease,
            transform 0.2s ease,
            box-shadow 0.25s ease;

          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
        }

        /* --------------------------------
           BUTTON TEXT
        -------------------------------- */

        .pixel-text {
          position: relative;
          z-index: 20;

          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          pointer-events: none;

          transition:
            color 0.25s ease,
            opacity 0.15s ease;
        }

        /* --------------------------------
           PIXEL GRID
        -------------------------------- */

        .pixel-grid {
          position: absolute;
          inset: 0;

          display: grid;

          grid-template-columns: repeat(15, 1fr);
          grid-template-rows: repeat(6, 1fr);

          pointer-events: none;

          z-index: 10;
        }

        .pixel {
          width: 100%;
          height: 100%;

          /* ONLY blue-500 */
          background: #3b82f6;

          opacity: 0;

          transform: translate(0, 0);

          transition:
            transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.25s ease;

          transition-delay: var(--delay);
        }

        /* --------------------------------
           HOVER
        -------------------------------- */

        .pixel-button.breaking {
          /* hover:bg-white */
          background: white;

          /* hover:text-black */
          color: black;

          box-shadow:
            0 0 0 1px rgba(59, 130, 246, 0.15),
            0 10px 35px rgba(59, 130, 246, 0.15);
        }

        /* --------------------------------
           PIXELS BREAK AWAY
        -------------------------------- */

        .pixel-button.breaking .pixel {
          opacity: 1;

          /* NO ROTATION */
          transform: translate(var(--x), var(--y));

          /* Only blue-500 */
          background: #3b82f6;
        }

        /* --------------------------------
           KEEP TEXT BLACK ON HOVER
        -------------------------------- */

        .pixel-button.breaking .pixel-text {
          color: black;
        }

        /* --------------------------------
           SUBTLE PIXEL GLITCH
        -------------------------------- */

        .pixel-button.breaking .pixel:nth-child(3n) {
          transition-duration: 0.42s;
        }

        .pixel-button.breaking .pixel:nth-child(4n) {
          transition-duration: 0.52s;
        }

        .pixel-button.breaking .pixel:nth-child(5n) {
          transition-duration: 0.62s;
        }

        /* --------------------------------
           CLICK
        -------------------------------- */

        .pixel-button:active {
          transform: scale(0.97);
        }

        /* --------------------------------
           MOBILE
        -------------------------------- */

        @media (max-width: 600px) {
          .pixel-button-wrapper {
            padding: 30px;
          }

          .pixel-button {
            width: 180px;
            height: 58px;
            font-size: 14px;
          }
        }

        /* --------------------------------
           REDUCED MOTION
        -------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          .pixel,
          .pixel-text,
          .pixel-button {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
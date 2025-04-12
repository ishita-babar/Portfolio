"use client";

import { useEffect, useState } from "react";

interface CursorSpotlightProps {
  size?: number;
  text?: string;
}

export default function CursorSpotlight({ size = 20, text = "" }: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition((prev) => {
        if (prev.x === e.clientX && prev.y === e.clientY) return prev;
        return { x: e.clientX, y: e.clientY };
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white rounded-full flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    >
      {text && <span className="text-black text-lg font-bold">{text}</span>}
    </div>
  );
}

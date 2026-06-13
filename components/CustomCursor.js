"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".scramble-link") ||
        target.closest(".clickable") ||
        target.closest("select") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Smooth Lerp loop running at 60fps
    let animationFrameId;
    const tick = () => {
      // Interpolate ring coordinates (0.18 creates a smooth fluid trail)
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-none pointer-events-none z-50 custom-cursor-ring"
        style={{
          width: hovered ? "40px" : "20px",
          height: hovered ? "40px" : "20px",
          backgroundColor: hovered ? "rgba(125, 104, 248, 0.5)" : "rgba(125, 104, 248, 0.28)",
          border: hovered ? "2px solid rgba(125, 104, 248, 0.85)" : "1.5px solid rgba(125, 104, 248, 0.6)",
          boxShadow: hovered 
            ? "0 0 25px rgba(125, 104, 248, 0.45)" 
            : "0 0 10px rgba(125, 104, 248, 0.2)",
        }}
      />
    </div>
  );
}

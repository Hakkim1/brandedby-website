"use client";

import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const activeCellsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const cellSize = 50; // Unified cell size matching the CSS blueprint grid

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const col = Math.floor(e.clientX / cellSize);
      const row = Math.floor(e.clientY / cellSize);

      const activeCells = activeCellsRef.current;

      // Avoid adding duplicate nodes if cursor is still in the same grid box
      const latest = activeCells[activeCells.length - 1];
      if (latest && latest.col === col && latest.row === row) {
        return;
      }

      // Add new active cell coordinates to the trail
      activeCells.push({
        col,
        row,
        opacity: 1.0,
      });

      // Maintain a strict trail length of 10 cells maximum to prevent memory leakage
      // Dynamic decay handles smooth fading so cells never pop out of existence
      if (activeCells.length > 10) {
        activeCells.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fading Grid Trails (Solid Brand Violet for visual smoothness)
      const activeCells = activeCellsRef.current;
      for (let i = activeCells.length - 1; i >= 0; i--) {
        const cell = activeCells[i];
        if (cell.opacity <= 0) {
          activeCells.splice(i, 1);
          continue;
        }

        const x = cell.col * cellSize;
        const y = cell.row * cellSize;

        // Violet color (125, 104, 248)
        ctx.fillStyle = `rgba(125, 104, 248, ${cell.opacity * 0.22})`;
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

        // Grid border highlight
        ctx.strokeStyle = `rgba(125, 104, 248, ${cell.opacity * 0.35})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

        // Dynamic decay: older cells in the trail fade out much faster
        const age = activeCells.length - 1 - i;
        let decayRate = 0.08 + age * 0.06;
        if (age >= 5) {
          decayRate = 0.45; // Beyond 5 boxes, fade out almost instantly
        }
        cell.opacity -= decayRate;
      }

      // 2. Draw Spotlight Circle around the cursor
      const { x: mx, y: my } = mouseRef.current;
      if (mx >= 0 && my >= 0) {
        const glowRadius = 160;
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);

        gradient.addColorStop(0, "rgba(125, 104, 248, 0.07)");
        gradient.addColorStop(0.5, "rgba(159, 145, 250, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

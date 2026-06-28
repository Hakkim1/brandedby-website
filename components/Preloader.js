"use client";

import { useEffect, useState, useRef } from "react";
import Logo from "@/components/Logo";

export default function Preloader() {
  const [percentage, setPercentage] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const lineRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    let active = true;

    const runAnimation = async () => {
      const { gsap } = await import("gsap");
      if (!active) return;

      // Progress counter animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation using GSAP (smooth slide up with Apple-style expo ease)
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              document.body.style.overflow = "auto";
              if (containerRef.current) {
                containerRef.current.style.display = "none";
              }
            }
          });
        }
      });

      // Animate percentage text from 0 to 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (active) setPercentage(Math.floor(counter.val));
        }
      }, 0);

      // Animate progress line width
      tl.to(lineRef.current, {
        width: "100%",
        duration: 1.8,
        ease: "power2.out"
      }, 0);

      // Set initial states to avoid FOUC and prepare for build-up animation
      gsap.set(logoRef.current, { opacity: 1, scale: 1 });
      gsap.set(".logo-mark-bg", { scale: 0, transformOrigin: "center", opacity: 0 });
      gsap.set(".logo-cube-poly-1", { x: -30, y: -30, opacity: 0 });
      gsap.set(".logo-cube-poly-2", { y: 30, opacity: 0 });
      gsap.set(".logo-cube-poly-3", { x: 30, y: 30, opacity: 0 });
      gsap.set(".logo-text-main", { x: -30, opacity: 0 });
      gsap.set(".logo-purple-square", { y: -120, opacity: 0 });
      gsap.set(".logo-text-studios", { y: 15, opacity: 0 });

      // 1. Fade/Scale in the black box background
      tl.to(".logo-mark-bg", { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.2);

      // 2. The building blocks cubes assembly
      tl.to(".logo-cube-poly-1", { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.4);
      tl.to(".logo-cube-poly-2", { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.5);
      tl.to(".logo-cube-poly-3", { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.6);

      // 3. Slide in the main text "Brandedby"
      tl.to(".logo-text-main", { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.5);

      // 4. The purple dot drop with bouncing physics
      tl.to(".logo-purple-square", { y: 0, opacity: 1, duration: 1.1, ease: "bounce.out" }, 0.7);

      // 5. Fade/Slide in "Studios" subtext
      tl.to(".logo-text-studios", { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.9);

      // Slide up text items slightly
      tl.fromTo(".preload-text",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 0.8, ease: "power2.out", stagger: 0.1 },
        0.3
      );
    };

    runAnimation();

    return () => {
      active = false;
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-bg z-[99999] flex flex-col justify-between p-8 md:p-16"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      {/* Top Header info (Minimalist, modern, clean) */}
      <div className="flex justify-between items-center w-full font-body text-[10px] tracking-[0.2em] text-muted uppercase font-semibold">
        <div className="preload-text">BRANDEDBY STUDIOS</div>
        <div className="preload-text">MUMBAI // BANGALORE</div>
      </div>

      {/* Center Logo Area */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div ref={logoRef} className="flex flex-col items-center gap-4">
          <Logo vertical={true} className="h-24 sm:h-28 md:h-32 w-auto" />
        </div>

        {/* Minimal Progress Tracker */}
        <div className="w-48 h-[1px] bg-border relative overflow-hidden mt-4">
          <div 
            ref={lineRef}
            className="absolute left-0 top-0 h-full bg-purple w-0"
          />
        </div>
      </div>

      {/* Bottom Counter & Status */}
      <div className="flex justify-between items-end w-full">
        <div className="preload-text font-body text-[10px] tracking-[0.2em] text-muted uppercase font-semibold">
          © 2026 // CREATIVE INCUBATION
        </div>
        <div 
          ref={percentRef} 
          className="font-heading font-black text-6xl md:text-8xl text-primary tracking-tighter"
        >
          {percentage.toString().padStart(3, "0")}
        </div>
      </div>
    </div>
  );
}

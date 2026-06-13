"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LayoutWrapper({ children }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Integrate Lenis RAF with GSAP ticker
    const updateGsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGsapTicker);
    };
  }, []);

  return <div className="relative z-10 w-full">{children}</div>;
}

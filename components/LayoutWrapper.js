"use client";

import { useEffect } from "react";

export default function LayoutWrapper({ children }) {
  useEffect(() => {
    let lenis;
    let updateGsapTicker;

    const init = async () => {
      const { default: LenisClass } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisClass({
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
      updateGsapTicker = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateGsapTicker);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (updateGsapTicker) {
        import("gsap").then(({ gsap }) => {
          gsap.ticker.remove(updateGsapTicker);
        });
      }
    };
  }, []);

  return <div className="relative z-10 w-full">{children}</div>;
}

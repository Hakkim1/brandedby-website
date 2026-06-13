"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const containerRef = useRef(null);
  const mascotRef = useRef(null);
  const faceGroupRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftEyeGroupRef = useRef(null);
  const rightEyeGroupRef = useRef(null);
  const mouthRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !mascotRef.current ||
      !faceGroupRef.current ||
      !leftPupilRef.current ||
      !rightPupilRef.current ||
      !leftEyeGroupRef.current ||
      !rightEyeGroupRef.current ||
      !mouthRef.current
    )
      return;

    const currentContainer = containerRef.current;

    // Set up transform origins for accurate scaling and rotations
    leftEyeGroupRef.current.style.transformOrigin = "153.5px 184.03px";
    rightEyeGroupRef.current.style.transformOrigin = "384.52px 184.03px";
    mouthRef.current.style.transformOrigin = "270.7px 340px";
    faceGroupRef.current.style.transformOrigin = "269px 269px";
    mascotRef.current.style.transformOrigin = "bottom center";

    // Mouse Tracking Variables
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to [-1, 1] range
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Jump Animation Variables
    let jumpStartTime = 0;
    const handleMascotClick = (event) => {
      event.stopPropagation();
      const now = Date.now() * 0.001;
      if (now - jumpStartTime > 0.95) { // Cooldown matching jump duration
        jumpStartTime = now;
      }
    };
    mascotRef.current.addEventListener("click", handleMascotClick);

    // Intersection Observer to stop animation loop when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(currentContainer);

    // Animation Loop Variables
    let animationFrameId;

    // LERP State Variables (ensures perfect bounciness transitions without glitches)
    let currentScaleX = 1.0;
    let currentScaleY = 1.0;
    let currentMouthScaleX = 1.0;
    let currentMouthScaleY = 1.0;
    let currentPupilScale = 1.0;
    let currentJumpY = 0;
    let currentPupilOffsetX = 0;
    let currentPupilOffsetY = 0;
    let currentFaceOffsetX = 0;
    let currentFaceOffsetY = 0;
    let currentBlinkScaleY = 1.0;
    let currentTiltZ = 0;
    let currentMascotRotateX = 0;
    let currentMascotRotateY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (
        !mascotRef.current ||
        !faceGroupRef.current ||
        !leftPupilRef.current ||
        !rightPupilRef.current ||
        !leftEyeGroupRef.current ||
        !rightEyeGroupRef.current ||
        !mouthRef.current
      ) {
        return;
      }

      if (!isVisible) return;

      const time = Date.now() * 0.001;

      // 1. Idle breathing bobbing (subtle vertical scaling + float)
      const breathingY = Math.sin(time * 2.5) * 3.5; // bobbing in pixels
      const breathingScaleY = 1.0 + Math.sin(time * 2.5) * 0.005;
      const breathingScaleX = 1.0 - Math.sin(time * 2.5) * 0.005;

      // 2. Click-to-Jump Animation (0.9s duration squash/stretch)
      const progress = time - jumpStartTime;
      let targetJumpY = 0;
      let targetScaleX = 1.0;
      let targetScaleY = 1.0;
      let targetMouthScaleX = 1.0;
      let targetMouthScaleY = 1.0;
      let targetPupilScale = 1.0;

      if (progress < 0.9) {
        if (progress < 0.12) {
          // Takeoff Squash
          const p = progress / 0.12;
          targetScaleY = 1.0 - p * 0.16;
          targetScaleX = 1.0 + p * 0.12;
          targetJumpY = 0;
        } else if (progress < 0.60) {
          // Airtime & Stretch (Excited Smile + Large Pupils)
          const p = (progress - 0.12) / 0.48;
          targetJumpY = -Math.sin(p * Math.PI) * 90; // Height of jump in pixels
          targetScaleY = 1.10 - 0.08 * Math.pow(p - 0.5, 2); // vertical stretch
          targetScaleX = 0.92 + 0.06 * Math.pow(p - 0.5, 2); // horizontal squeeze
          targetMouthScaleX = 1.25; // wide happy smile
          targetMouthScaleY = 0.95;
          targetPupilScale = 1.22; // excited pupils
        } else {
          // Landing impact cushion & recovery
          const p = (progress - 0.60) / 0.30;
          targetScaleY = 1.0 - Math.sin(p * Math.PI) * 0.20;
          targetScaleX = 1.0 + Math.sin(p * Math.PI) * 0.14;
          targetJumpY = 0;
        }
      }

      // Smoothly LERP states
      currentScaleX += (targetScaleX * breathingScaleX - currentScaleX) * 0.2;
      currentScaleY += (targetScaleY * breathingScaleY - currentScaleY) * 0.2;
      currentMouthScaleX += (targetMouthScaleX - currentMouthScaleX) * 0.18;
      currentMouthScaleY += (targetMouthScaleY - currentMouthScaleY) * 0.18;
      currentPupilScale += (targetPupilScale - currentPupilScale) * 0.18;
      currentJumpY += (targetJumpY - currentJumpY) * 0.32;

      // 3. Curious Head Tilt (every 7 seconds, idle state only)
      const tiltCycle = time % 7;
      let targetTiltZ = 0;
      if (progress >= 0.9 && tiltCycle > 1.8 && tiltCycle < 3.8) {
        const p = (tiltCycle - 1.8) / 2.0;
        targetTiltZ = Math.sin(p * Math.PI) * 6; // tilt up to 6 degrees
      }
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.1;

      // 4. Periodic Eye Blinking (every 4 seconds)
      const blinkCycle = time % 4;
      let targetBlinkScaleY = 1.0;
      if (blinkCycle > 3.7) {
        const p = (blinkCycle - 3.7) / 0.3;
        if (p < 0.5) {
          targetBlinkScaleY = 1.0 - (p * 2) * 0.95; // blink down to 5% height
        } else {
          targetBlinkScaleY = 0.05 + (p - 0.5) * 2 * 0.95; // open back to 100%
        }
      }
      currentBlinkScaleY += (targetBlinkScaleY - currentBlinkScaleY) * 0.25;

      // 5. 2D Parallax Face Slide (creates stunning depth inside the square)
      const targetFaceOffsetX = mouseX * 24; // slide face horizontally
      const targetFaceOffsetY = -mouseY * 18; // slide face vertically
      currentFaceOffsetX += (targetFaceOffsetX - currentFaceOffsetX) * 0.14;
      currentFaceOffsetY += (targetFaceOffsetY - currentFaceOffsetY) * 0.14;

      // 3D Mascot Box Tilt (responds to cursor)
      const targetMascotRotateX = mouseY * 12; // tilts up/down by 12 deg
      const targetMascotRotateY = mouseX * 12; // tilts left/right by 12 deg
      currentMascotRotateX += (targetMascotRotateX - currentMascotRotateX) * 0.14;
      currentMascotRotateY += (targetMascotRotateY - currentMascotRotateY) * 0.14;

      // 6. Snappy Pupil Cursor Tracking (moves inside the eye white circles)
      const targetPupilOffsetX = mouseX * 45; // slightly larger sensitivity
      const targetPupilOffsetY = -mouseY * 45;
      currentPupilOffsetX += (targetPupilOffsetX - currentPupilOffsetX) * 0.22;
      currentPupilOffsetY += (targetPupilOffsetY - currentPupilOffsetY) * 0.22;

      // Constrain pupil offsets dynamically based on the current scale to stay strictly inside the 73.77px eye radius
      const currentPupilRadius = 39 * currentPupilScale;
      const maxDistance = 73.77 - currentPupilRadius - 1.5; // 1.5px safety margin
      
      const currentMagnitude = Math.sqrt(currentPupilOffsetX * currentPupilOffsetX + currentPupilOffsetY * currentPupilOffsetY);
      let renderPupilOffsetX = currentPupilOffsetX;
      let renderPupilOffsetY = currentPupilOffsetY;
      
      if (currentMagnitude > maxDistance && currentMagnitude > 0) {
        renderPupilOffsetX = (currentPupilOffsetX / currentMagnitude) * maxDistance;
        renderPupilOffsetY = (currentPupilOffsetY / currentMagnitude) * maxDistance;
      }

      // --- APPLY TRANSFORMS TO DOM ---
      
      // Main Square Body (incorporates jump translation, squash/stretch, tilt, breathing, and 3D cursor tilt)
      mascotRef.current.style.transform = `translate3d(0, ${currentJumpY + breathingY}px, 0) scale(${currentScaleX}, ${currentScaleY}) rotate(${currentTiltZ}deg) rotateX(${currentMascotRotateX}deg) rotateY(${currentMascotRotateY}deg)`;

      // Face Group (parallax translation)
      faceGroupRef.current.style.transform = `translate3d(${currentFaceOffsetX}px, ${currentFaceOffsetY}px, 0)`;

      // Pupils (position offsets + excited scaling direct attribute updates)
      leftPupilRef.current.setAttribute("cx", 153.5 + renderPupilOffsetX);
      leftPupilRef.current.setAttribute("cy", 184.03 + renderPupilOffsetY);
      leftPupilRef.current.setAttribute("r", currentPupilRadius);

      rightPupilRef.current.setAttribute("cx", 384.52 + renderPupilOffsetX);
      rightPupilRef.current.setAttribute("cy", 184.03 + renderPupilOffsetY);
      rightPupilRef.current.setAttribute("r", currentPupilRadius);

      // Eye Groups (for blinking)
      leftEyeGroupRef.current.style.transform = `scale(1, ${currentBlinkScaleY})`;
      rightEyeGroupRef.current.style.transform = `scale(1, ${currentBlinkScaleY})`;

      // Mouth (happy scaling during jump)
      mouthRef.current.style.transform = `scale(${currentMouthScaleX}, ${currentMouthScaleY})`;
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mascotRef.current) {
        mascotRef.current.removeEventListener("click", handleMascotClick);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative z-10 cursor-pointer overflow-visible"
      style={{ perspective: 1000 }}
    >
      <svg
        ref={mascotRef}
        className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[410px] lg:h-[410px] select-none pointer-events-auto"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 20px 40px rgba(15,15,22,0.12))",
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        viewBox="0 0 538.01 538.01"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Purple Background Rect from SVG (#7d68f8) */}
        <rect fill="#7d68f8" width="538.01" height="538.01" />

        {/* Face Group (Handles 2D Parallax) */}
        <g ref={faceGroupRef} style={{ willChange: "transform" }}>
          
          {/* Left Eye */}
          <g ref={leftEyeGroupRef} style={{ willChange: "transform" }}>
            <circle fill="#fff" cx="153.5" cy="184.03" r="73.77" />
            <circle ref={leftPupilRef} fill="#000" cx="153.5" cy="184.03" r="39" style={{ willChange: "transform" }} />
          </g>

          {/* Right Eye */}
          <g ref={rightEyeGroupRef} style={{ willChange: "transform" }}>
            <circle fill="#fff" cx="384.52" cy="184.03" r="73.77" />
            <circle ref={rightPupilRef} fill="#000" cx="384.52" cy="184.03" r="39" style={{ willChange: "transform" }} />
          </g>

          {/* Mouth - Exact Smile Path Coords from SVG */}
          <path
            ref={mouthRef}
            fill="#fff"
            style={{ willChange: "transform" }}
            d="M270.7,360.85c-1.31,0-2.63-.02-3.96-.07-29.7-1.06-51.53-13.82-61.9-21.33-3.8-2.75-4.65-8.07-1.9-11.87,2.76-3.8,8.07-4.65,11.87-1.9,8.8,6.38,27.33,17.21,52.53,18.11,26.61.95,46.58-9.56,56.13-15.9,3.91-2.6,9.19-1.53,11.78,2.38,2.6,3.91,1.53,9.19-2.38,11.78-10.77,7.15-32.83,18.8-62.18,18.8Z"
          />
        </g>
      </svg>
    </div>
  );
}

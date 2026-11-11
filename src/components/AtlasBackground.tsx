"use client";

import React, { useEffect, useState } from "react";

export function AtlasBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Reaches complete connection when user scrolls ~260px down
      const progress = Math.min(1, Math.max(0, scrollY / 260));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When at top (progress = 0):
  // The celestial sphere floats separated higher up by -70px
  // The Titan body waits slightly lower by +25px
  // As user scrolls down, both converge to 0px, locking the artwork into a single statue!
  const globeTranslateY = -((1 - scrollProgress) * 75);
  const titanTranslateY = (1 - scrollProgress) * 25;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Ambient glow behind statue - adapts smoothly between dark and light mode */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl transition-opacity duration-300 dark:bg-amber-500/10 bg-amber-400/20"
        style={{
          opacity: 0.35 + scrollProgress * 0.45,
          transform: `scale(${0.9 + scrollProgress * 0.15})`,
        }}
      />

      {/* Frame wrapper for the sculpture layers */}
      <div
        className="relative w-[340px] sm:w-[460px] md:w-[540px] h-[650px] sm:h-[880px] md:h-[1020px] max-w-[90vw] max-h-[92vh] transition-opacity duration-500"
        style={{
          // Opacity is calibrated so text and cards over it are 100% legible, but the art is clearly admired
          opacity: 0.28 + scrollProgress * 0.18,
        }}
      >
        {/* Layer 1: Abóbada Celeste (Upper Layer) */}
        <div
          className="absolute inset-0 z-10 will-change-transform transition-transform duration-75"
          style={{
            transform: `translateY(${globeTranslateY}px)`,
          }}
        >
          <img
            src="/atlas-bg-globe.png"
            alt=""
            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] dark:brightness-105 brightness-95"
          />
        </div>

        {/* Layer 2: O Titã Atlas (Lower Layer) */}
        <div
          className="absolute inset-0 z-10 will-change-transform transition-transform duration-75"
          style={{
            transform: `translateY(${titanTranslateY}px)`,
          }}
        >
          <img
            src="/atlas-bg-titan.png"
            alt=""
            className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] dark:brightness-105 brightness-95"
          />
        </div>
      </div>
    </div>
  );
}

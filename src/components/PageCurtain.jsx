import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageCurtain({ isNavigating, isThemeSwitching }) {
  const progressBarRef = useRef(null);
  const indicatorRef = useRef(null);

  const active = isNavigating || isThemeSwitching;

  useEffect(() => {
    if (active) {
      gsap.killTweensOf(progressBarRef.current);
      gsap.killTweensOf(indicatorRef.current);

      gsap.set(indicatorRef.current, { opacity: 1, display: "block" });
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 0.85, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(indicatorRef.current, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
              if (indicatorRef.current) gsap.set(indicatorRef.current, { display: "none" });
              if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: 0 });
            },
          });
        },
      });
    }
  }, [active]);

  return (
    <div
      ref={indicatorRef}
      style={{ display: "none" }}
      className="fixed top-0 inset-x-0 z-[9999] pointer-events-none select-none transition-opacity"
    >
      {/* Sleek 3px Ambient Top Loading Bar */}
      <div className="h-[3px] w-full bg-white/5 overflow-hidden shadow-lg shadow-bronze/40">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-bronze-light via-bronze to-ember origin-left"
        />
      </div>

      {/* Floating Subtle Micro Pill Indicator */}
      <div className="flex justify-center pt-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-white/10 backdrop-blur-md shadow-xl text-[10px] uppercase tracking-widest text-parchment animate-pulse">
          <div className="h-1.5 w-1.5 rounded-full bg-bronze animate-ping" />
          <span>{isThemeSwitching ? "Switching Theme" : "Loading"}</span>
        </div>
      </div>
    </div>
  );
}

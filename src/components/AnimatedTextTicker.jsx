import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTextTicker() {
  const containerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text scrub pin & opposing split movement on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      tl.to(textLeftRef.current, {
        xPercent: -35,
        ease: "power2.out",
      }, 0)
      .to(textRightRef.current, {
        xPercent: 35,
        ease: "power2.out",
      }, 0)
      .fromTo(cardRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 40,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "power3.out",
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-ink py-28 lg:py-40 select-none "
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-bronze/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Opposing Scroll Split Text Layer 1: Left Shift */}
      <div ref={textLeftRef} className="whitespace-nowrap will-change-transform opacity-25">
        <span className="font-display text-6xl sm:text-8xl lg:text-[130px] font-extralight uppercase tracking-[0.25em] text-parchment">
          LUMINARY MONUMENTALITY • SPATIAL ETHEREALITY • METALLURGIC SYNERGY •
        </span>
      </div>

      {/* Center Interactive Highlight Card */}
      <div className="my-8 mx-auto max-w-4xl px-6 text-center z-10 relative">
        <div
          ref={cardRef}
          className="p-8 sm:p-12 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-bronze-light font-semibold block mb-3">
            Architectural Ethos
          </span>
          <h3 className="font-display text-2xl sm:text-4xl text-parchment font-light leading-snug">
            "Form transcends material when light articulates the silent volume of space."
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-mute uppercase tracking-widest font-mono">
            — Vibhor Sogani Studio
          </p>
        </div>
      </div>

      {/* Opposing Scroll Split Text Layer 2: Right Shift */}
      <div ref={textRightRef} className="whitespace-nowrap will-change-transform opacity-25 text-right">
        <span className="font-display text-6xl sm:text-8xl lg:text-[130px] font-extralight uppercase tracking-[0.25em] text-bronze">
          • MONUMENTAL KINETICS • ARCHITECTURAL POETRY • CHRONO-SPATIAL ARTICULATION
        </span>
      </div>
    </section>
  );
}

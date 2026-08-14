import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BarbaTransition({ active }) {
  const panelRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (active) {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // Swipe up dark architectural curtain (0.4s)
      tl.set(panelRef.current, { yPercent: 100, display: "flex", opacity: 1 })
        .to(panelRef.current, {
          yPercent: 0,
          duration: 0.4,
        })
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.94, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3 },
          "-=0.15"
        );

      return () => tl.kill();
    } else {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // Sweep curtain upward out of view (0.45s)
      tl.to(logoRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.2,
      })
        .to(
          panelRef.current,
          {
            yPercent: -100,
            duration: 0.45,
            ease: "power4.inOut",
            onComplete: () => {
              if (panelRef.current) gsap.set(panelRef.current, { display: "none" });
            },
          },
          "-=0.1"
        );

      return () => tl.kill();
    }
  }, [active]);

  return (
    <div
      ref={panelRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0a08] pointer-events-none select-none overflow-hidden"
    >
      <div ref={logoRef} className="flex flex-col items-center gap-4">
        <img
          src="/logo.svg"
          alt="Studio Vibhor Sogani"
          className="h-10 w-auto object-contain brightness-0 invert opacity-95"
        />
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-bronze/60" />
          <span className="text-[11px] uppercase tracking-[0.35em] text-bronze-light font-medium">
            Studio Vibhor Sogani
          </span>
          <div className="h-px w-10 bg-bronze/60" />
        </div>
      </div>
    </div>
  );
}

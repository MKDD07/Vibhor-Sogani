import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { label: "Sketch", desc: "Every form starts as a fast hand-drawn gesture \u2014 the idea before the engineering." },
  { label: "Model", desc: "Small maquettes in clay and wire test proportion, balance and light." },
  { label: "Fabricate", desc: "Steel and aluminium are cut, welded and finished at the studio\u2019s workshop." },
  { label: "Install", desc: "The work is raised on site, calibrated to its landscape and its audience." },
];

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        scale: 0.92,
        letterSpacing: "0.05em",
        opacity: 0,
        y: 40,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".process-step", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-4 text-xs uppercase tracking-wide-x text-bronze-light">Materials &amp; Process</p>
        <h2 className="process-title font-display max-w-2xl text-4xl leading-tight text-parchment sm:text-5xl">
          From sketch to steel, in the studio&rsquo;s own hands.
        </h2>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.label} className="process-step">
              <span className="font-display text-sm text-bronze">{s.label}</span>
              <div className="mt-3 h-px w-10 bg-bronze/40" />
              <p className="mt-4 text-sm leading-relaxed text-mute">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

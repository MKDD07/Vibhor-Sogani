import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton } from "./Buttons";

gsap.registerPlugin(ScrollTrigger);

export default function StudioBanner({ noParallax = false }) {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const imgEl = imgRef.current;
    if (!sectionEl || !imgEl) return;

    // Check if StudioBanner is immediately above the footer or if on mobile (< 768px)
    const isAdjacentToFooter = () => {
      if (noParallax || window.innerWidth < 768) return true;
      const nextSibling = sectionEl.nextElementSibling;
      if (!nextSibling) {
        const parentNext = sectionEl.parentElement?.nextElementSibling;
        if (parentNext?.tagName?.toLowerCase() === "footer") return true;
        if (!parentNext && sectionEl.closest('[data-barba="container"]')) return true;
      }
      if (nextSibling?.tagName?.toLowerCase() === "footer") return true;
      return false;
    };

    const disableParallax = isAdjacentToFooter();

    if (disableParallax) {
      // Static placement when directly above footer (no parallax conflict)
      gsap.set(imgEl, { yPercent: 0, scale: 1 });
      return;
    }

    // Parallax scroll movement when away from footer
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgEl,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [noParallax]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-surface-2 py-24 lg:py-32">
      {/* Background Image - Dynamic Parallax when away from footer / Clean static when above footer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/soganidesign/banner_sogani_studio.png"
          alt="SOGANI Design Studio"
          className="h-full w-full object-cover object-center opacity-100 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent w-full sm:w-[45%]" />
      </div>

      <div className="site-container relative z-10 flex flex-col justify-between min-h-[300px]">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-wide-x text-bronze-light font-semibold">
            Sister Studio &mdash; Lighting &amp; Product Design
          </p>
          
          <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl font-light">
            SOGANI Design Studio
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://sogani.design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <PrimaryButton showIcon={false}>
                <span>Visit Sogani Design</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="relative z-10 text-xs" />
              </PrimaryButton>
            </a>
          </div>
        </div>

        {/* Subtitle paragraph positioned in bottom right corner */}
        <div className="hidden sm:block mt-12 self-end text-right max-w-md bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <p className="text-[14px] leading-relaxed text-white sm:text-lg font-light">
            Bespoke lighting design sculpted for modern spaces.
          </p>
        </div>
      </div>
    </section>
  );
}

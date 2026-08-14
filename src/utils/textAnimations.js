import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Universal Text Animation System (3 Distinct GSAP Modes):
 * 
 * 1. Type 1: Char Scrub (`about-title-char` or `about-title`)
 *    - Splits text letter-by-letter, scrubs opacity & Y on scroll.
 * 
 * 2. Type 2: Word Reveal (`about-title-words`)
 *    - Smooth word-by-word mask / stagger reveal.
 * 
 * 3. Type 3: Elegant Editorial Mask / Velocity Lift (`about-title-line` or `about-title-lift`)
 *    - Editorial curtain reveal from bottom with 3D perspective rotation.
 */

export function initUniversalTextAnimations(scope = document) {
  const container = typeof scope === "string" ? document.querySelector(scope) : scope;
  if (!container) return () => {};

  const ctx = gsap.context(() => {
    // ------------------------------------------------------------------
    // TYPE 1: Character-by-Character Scroll Scrub (.about-title / .about-title-char)
    // ------------------------------------------------------------------
    const charElements = container.querySelectorAll(".about-title-char, .about-title:not(.about-title-words):not(.about-title-lift):not(.about-title-line)");
    charElements.forEach((el) => {
      // If manually split into .about-char inside JSX
      const existingChars = el.querySelectorAll(".about-char");
      
      if (existingChars.length > 0) {
        gsap.fromTo(
          existingChars,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      } else if (!el.dataset.splitDone) {
        // Automatic runtime character splitting
        el.dataset.splitDone = "true";
        const rawText = el.innerText.trim();
        const words = rawText.split(" ");
        el.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block whitespace-nowrap">${word
                .split("")
                .map(
                  (c) => `<span class="about-char inline-block opacity-20 transition-transform">${c}</span>`
                )
                .join("")}&nbsp;</span>`
          )
          .join("");

        const newChars = el.querySelectorAll(".about-char");
        if (newChars.length) {
          gsap.fromTo(
            newChars,
            { opacity: 0.2, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
        }
      }
    });

    // ------------------------------------------------------------------
    // TYPE 2: Word-by-Word Smooth Stagger Reveal (.about-title-words)
    // ------------------------------------------------------------------
    const wordElements = container.querySelectorAll(".about-title-words");
    wordElements.forEach((el) => {
      if (!el.dataset.splitDone) {
        el.dataset.splitDone = "true";
        const rawText = el.innerText.trim();
        const words = rawText.split(" ");
        el.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden pb-1"><span class="about-word inline-block translate-y-full opacity-0 will-change-transform">${word}</span>&nbsp;</span>`
          )
          .join("");
      }

      const wordsSpans = el.querySelectorAll(".about-word");
      if (wordsSpans.length) {
        gsap.to(wordsSpans, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    // ------------------------------------------------------------------
    // TYPE 3: Editorial Mask & Velocity 3D Lift (.about-title-lift / .about-title-line)
    // ------------------------------------------------------------------
    const liftElements = container.querySelectorAll(".about-title-lift, .about-title-line");
    liftElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 45,
          rotationX: 15,
          transformOrigin: "bottom center",
          transformPerspective: 800,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

  }, container);

  return () => ctx.revert();
}

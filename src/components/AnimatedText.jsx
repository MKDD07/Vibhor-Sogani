import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText helper component
 * Splits any string into character spans while preserving words and spaces,
 * and scrubs character opacity from 0.15 to 1.0 on viewport scroll.
 */
export default function AnimatedText({
  text,
  className = "",
  as: Component = "h2",
  start = "top 85%",
  end = "top 45%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".anim-char");
    if (!chars.length) return;

    const anim = gsap.fromTo(
      chars,
      { opacity: 0.15, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: start,
          end: end,
          scrub: 0.5,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [text, start, end]);

  // Split words first to prevent awkward word-breaking across lines
  const words = text.split(" ");

  return (
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="anim-char inline-block transition-transform duration-75"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

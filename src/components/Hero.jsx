import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrimaryButton, GhostButton } from "./Buttons";

const SLIDES = [
  {
    title: "ECHO",
    tag: "Public Installation \u2014 Delhi",
    img: "/images/banner/banner_0001.png",
  },
  {
    title: "Joy",
    tag: "Monumental Sculpture \u2014 Dubai",
    img: "/images/banner/banner_0002.png",
  },
  {
    title: "Shankha",
    tag: "Steel Installation \u2014 India",
    img: "/images/banner/banner_0003.png",
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const imgRefs = useRef([]);
  const captionRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === index ? 1 : 0,
        scale: i === index ? 1 : 1.08,
        duration: 1.2,
        ease: "power2.out",
      });
    });
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [index]);

  return (
    <section id="home" className="relative flex h-screen min-h-[640px] w-full items-end overflow-hidden bg-surface">
      {SLIDES.map((s, i) => (
        <img
          key={s.title}
          ref={(el) => (imgRefs.current[i] = el)}
          src={s.img}
          alt={s.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
        <p className="mb-5 text-xs uppercase tracking-wide-x text-bronze-light">
          Sculpture &amp; Public Installation
        </p>
        <h1 className="font-display max-w-3xl text-[13vw] leading-[0.95] text-parchment sm:text-6xl lg:text-7xl">
{SLIDES[index].title}
        </h1>

        <div ref={captionRef} className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-start sm:justify-between gap-6 border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-fit">
            <PrimaryButton>View Installations</PrimaryButton>
            <GhostButton>About the Studio</GhostButton>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.title}`}
              className={
                "h-1 rounded-full transition-all duration-500 " +
                (i === index ? "w-10 bg-bronze" : "w-4 bg-white/20")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    title: "ECHO",
    description: "Light ripples outward through a sculptural circle of steel and iron.",
    tag: "Public Installation \u2014 Delhi",
    img: "/images/banner/banner_0001.png",
  },
  {
    title: "Joy",
    description: "A mirrored bouquet of balloons celebrates life at Dubai Creek Harbour.",
    tag: "Monumental Sculpture \u2014 Dubai",
    img: "/images/banner/banner_0002.png",
  },
  {
    title: "Shankha",
    description: "A conch-inspired sculpture glows with amber light, symbolising new beginnings.",
    tag: "Steel Installation \u2014 India",
    img: "/images/banner/banner_0003.png",
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const imgRefs = useRef([]);
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to(sceneRef.current, {
          y: () => sectionRef.current.offsetHeight * 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

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
      headingRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [index]);

  return (
    <section id="home" ref={sectionRef} className="relative h-screen min-h-[640px] w-full overflow-hidden bg-surface">
      <div ref={sceneRef} className="absolute inset-0 flex items-end">
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

      <div className="site-container relative z-10 w-full pb-24 pt-40">
        <div ref={headingRef}>
          <h1 className="page-heading font-display max-w-3xl font-light text-parchment">
            {SLIDES[index].title}
          </h1>
          <p className="site-prose mt-3 max-w-2xl text-sm leading-relaxed text-parchment/80 sm:text-base">
            {SLIDES[index].description}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

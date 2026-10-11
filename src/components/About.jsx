import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GhostButton } from "./Buttons";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 25, suffix: "+", label: "Years Practice" },
  { value: 10, suffix: "", label: "Countries" },
];

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const statsContainerRef = useRef(null);
  const countRefs = useRef([]);

  const titleText = "Vibhor Sogani";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character-by-character dim-to-full viewport scrub
      gsap.fromTo(
        ".about-char",
        { opacity: 0.2, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // Paragraph & elements dim-to-full viewport scrub
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0.2, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      // Odometer / Number count animation when entering view
      STATS.forEach((stat, i) => {
        const el = countRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val) + stat.suffix;
          },
        });
      });

      gsap.to(imgRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-ink py-28 lg:py-36">
      <div className="site-container grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="about-reveal relative aspect-[4/5] overflow-hidden rounded-sm">
          <img
            ref={imgRef}
            src="/images/about/about_0001.webp"
            alt="Vibhor Sogani in his studio"
            className="h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="about-reveal mb-4 text-xs uppercase tracking-wide-x text-bronze">
            About the Artist
          </p>
          <div className="overflow-hidden">
            <h2 className="section-heading about-title font-display text-4xl leading-tight text-parchment sm:text-5xl flex flex-wrap">
              {titleText.split("").map((char, index) => (
                <span key={index} className="about-char inline-block origin-bottom transition-transform">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>
          <p className="site-prose about-reveal mt-6 max-w-xl text-[14px] leading-relaxed text-mute">
            For over two decades, Vibhor Sogani has translated raw steel and
            aluminium into public monuments that sit at the meeting point of
            engineering and instinct. His practice moves between the studio
            and the street  sculptures conceived at the scale of a
            hand, then built at the scale of a city.
          </p>
          <p className="site-prose about-reveal mt-4 max-w-xl text-[14px] leading-relaxed text-mute">
            Rooted in organic form and industrial material, his installations
             from the sprouts of <em className="text-bronze-light not-italic">Kalpataru</em> to
            the coiled steel of <em className="text-bronze-light not-italic">Shankha </em> 
            have become landmarks across India and the Gulf.
          </p>

          <div
            ref={statsContainerRef}
            className="about-reveal mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <p
                  ref={(el) => (countRefs.current[i] = el)}
                  className="font-display !text-4xl text-bronze font-medium"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-mute">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


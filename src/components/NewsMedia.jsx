import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faNewspaper, faEye, faArrowRight } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const NEWS = [
  { source: "Architectural Digest", date: "Jun 2026", title: "Inside the making of Kalpavriksha, Jaipur\u2019s newest steel landmark" },
  { source: "The Hindu", date: "Feb 2026", title: "Vibhor Sogani on scale, patina and public sculpture" },
  { source: "Design Pataki", date: "Nov 2025", title: "Five installations that changed how India sees public art" },
];

const MEDIA = [
  { kind: "Video", label: "Studio walkthrough", img: "/images/about/about_0002.jpg", icon: faPlay },
  { kind: "Press", label: "Kalpataru, 10 years on", img: "/images/banner/banner_0001.png", icon: faNewspaper },
  { kind: "Feature", label: "The making of Shankha", img: "/images/banner/banner_0003.png", icon: faEye },
];

export default function NewsMedia() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-row, .media-card", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="news" ref={sectionRef} className="bg-surface py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-wide-x text-bronze-light">Press</p>
            <h2 className="font-display text-4xl text-parchment sm:text-5xl">News</h2>

            <div className="mt-10 flex flex-col divide-y divide-white/10">
              {NEWS.map((n) => (
                <a
                  key={n.title}
                  href="#"
                  className="news-row group flex flex-col gap-2 py-6 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-mute">
                    <span>{n.source}</span>
                    <span>{n.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-display text-[14px] text-parchment transition-colors duration-300 group-hover:text-bronze-light sm:text-xl">
                      {n.title}
                    </p>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs text-mute opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div id="media">
            <p className="mb-4 text-xs uppercase tracking-wide-x text-bronze-light">Watch &amp; Read</p>
            <h2 className="font-display text-4xl text-parchment sm:text-5xl">Media</h2>

            <div className="mt-10 grid gap-5">
              {MEDIA.map((m) => (
                <a
                  key={m.label}
                  href="#"
                  className="media-card group relative flex h-40 overflow-hidden rounded-sm bg-surface-2"
                >
                  <div className="relative h-full w-2/5 overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.label}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-bronze-light text-xs backdrop-blur-sm">
                        <FontAwesomeIcon icon={m.icon} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-6">
                    <span className="text-xs uppercase tracking-wide text-bronze-light">{m.kind}</span>
                    <p className="mt-2 font-display text-[14px] text-parchment">{m.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

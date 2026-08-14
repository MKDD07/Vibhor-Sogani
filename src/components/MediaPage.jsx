import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faNewspaper, faEye, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";

gsap.registerPlugin(ScrollTrigger);

const MEDIA_GALLERY = [
  {
    kind: "Video Document",
    label: "Studio Walkthrough & Sculpting Philosophy",
    duration: "04:20 min",
    description: "An intimate look into Vibhor Sogani's Delhi studio, exploring how initial scale sketches evolve into multi-ton steel public landmarks.",
    img: "/images/about/about_0002.jpg",
    icon: faPlay,
  },
  {
    kind: "Retrospective",
    label: "Sprouts (Kalpataru): 10 Years On",
    duration: "Photo Essay",
    description: "Reflections on India's most celebrated 6-acre public art landmark near the AIIMS flyover in New Delhi.",
    img: "/images/banner/banner_0001.png",
    icon: faNewspaper,
  },
  {
    kind: "Short Film",
    label: "The Engineering & Making of Shankha",
    duration: "06:15 min",
    description: "Behind-the-scenes precision laser cutting, curving, and ambient light synchronization for monumental installations.",
    img: "/images/banner/banner_0003.png",
    icon: faEye,
  },
  {
    kind: "Design Dialogue",
    label: "Keynote: Light as a Sculptural Material",
    duration: "24:00 min",
    description: "Vibhor Sogani addresses architectural conferences on the transformative capability of interactive public lighting.",
    img: "/images/about/about_0001.webp",
    icon: faPlay,
  },
];

export default function MediaPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".media-item-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-ink min-h-screen text-parchment">
      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-white/10">
        <span className="text-xs uppercase tracking-wide-x text-bronze-light font-semibold block mb-3">
          Watch &amp; Experience
        </span>
        <h1 className="about-title-words font-display text-4xl sm:text-6xl lg:text-7xl font-light text-parchment">
          Media
        </h1>
        <p className="text-mute text-base sm:text-lg font-light mt-4 max-w-2xl">
          Films, studio documentaries, keynote dialogues, and behind-the-scenes engineering footage.
        </p>
      </section>

      {/* Media Showcase Grid */}
      <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {MEDIA_GALLERY.map((m, idx) => (
            <div
              key={idx}
              className="media-item-card group overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 hover:border-bronze/40 backdrop-blur-sm transition-all duration-500 shadow-xl shadow-black/20"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={m.img}
                  alt={m.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Play / View Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-ink/80 border border-white/20 flex items-center justify-center text-bronze-light text-base backdrop-blur-md group-hover:scale-110 group-hover:bg-bronze group-hover:text-ink transition-all duration-300 shadow-lg">
                    <FontAwesomeIcon icon={m.icon} />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                    {m.kind}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="text-xs font-mono text-bronze-light bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    {m.duration}
                  </span>
                </div>
              </div>

              {/* Media Content Info */}
              <div className="p-8">
                <h2 className="font-display text-2xl font-normal text-white group-hover:text-bronze-light transition-colors duration-300">
                  {m.label}
                </h2>
                <p className="text-neutral-400 text-sm font-light mt-3 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sister Studio Banner */}
      <StudioBanner />

      {/* Newsletter & Contact */}
      <div className="border-t border-white/10 pt-16 bg-surface-2/30 space-y-16">
        <Newsletter />
        <Contact />
      </div>
    </div>
  );
}

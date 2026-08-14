import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faAward,
  faLandmark,
  faLightbulb,
  faGem,
  faCompass,
  faPalette,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "2024 – 2025",
    category: "Global Monumental Work",
    title: "London Design Biennale & Royal Caribbean",
    description:
      "Presented 'Silent Subtext' film at London Design Biennale 2025. Created a nine-deck-high 65ft wishing tree for Royal Caribbean's Utopia of the Seas. Awarded Lifetime Design Excellence Award (2025).",
    highlights: ["London Design Biennale 2025", "65ft Wishing Tree", "Lifetime Design Excellence Award"],
    icon: faAward,
    accentColor: "#E8C87A", // bronze-light
    themeClass: "theme-bronze-light",
  },
  {
    year: "2024",
    category: "Government Commission",
    title: "Kalpataru & Yashobhoomi IICC",
    description:
      "Created 'Kalpataru', a 20-ft light art installation for Project PARI, New Delhi. Commissioned centerpiece for Yashobhoomi IICC, inaugurated by PM Narendra Modi.",
    highlights: ["Project PARI, New Delhi", "Ashoka Chakra Motif", "Inaugurated by Prime Minister"],
    icon: faLandmark,
    accentColor: "#E2BA65",
    themeClass: "theme-bronze-light",
  },
  {
    year: "2023 – 2024",
    category: "International Light Art",
    title: "Pool of Dreams – Amsterdam Light Festival",
    description:
      "Selected as the only Indian artist for the 12th Amsterdam Light Festival. 'Pool of Dreams' is now part of Amsterdam's permanent Light Art Collection.",
    highlights: ["12th Amsterdam Light Festival", "Permanent Light Art Collection", "Solo Indian Selection"],
    icon: faLightbulb,
    accentColor: "#CE4615", // bronze
    themeClass: "theme-bronze",
  },
  {
    year: "2018",
    category: "Luxury Product Design",
    title: "SOGANI Luxury Lighting",
    description:
      "Launched bespoke luxury lighting collection at Light + Building, Frankfurt. Featured exhibition at Italian Ambassador's residence, New Delhi.",
    highlights: ["Light + Building, Frankfurt", "Italian Ambassador Residence", "Global Bespoke Collection"],
    icon: faGem,
    accentColor: "#B83B10",
    themeClass: "theme-bronze",
  },
  {
    year: "2007 – 2010",
    category: "Iconic Public Art",
    title: "Sprouts & Kalpavriksha",
    description:
      "Created 'Sprouts', a 40-ft iconic public art installation in New Delhi celebrating India's growth, and 'Kalpavriksha', a 35-ft mirror-finished steel sculpture in Ahmedabad.",
    highlights: ["40-ft Sprouts, New Delhi", "35-ft Kalpavriksha, Ahmedabad", "Mirror-Finished Steel"],
    icon: faCompass,
    accentColor: "#9E2A0B", // ember
    themeClass: "theme-ember",
  },
  {
    year: "2002 – 2006",
    category: "Early Practice & Kinetics",
    title: "Exhibition Design & A'rise",
    description:
      "Designed large-scale exhibition pavilions for DRDO Defexpo. Created 'A'rise', a 22-ft kinetic steel sculpture for Airtel HQ, Gurugram.",
    highlights: ["DRDO Defexpo Pavilions", "22-ft Kinetic Sculpture", "Airtel HQ Landmark"],
    icon: faPalette,
    accentColor: "#801F07",
    themeClass: "theme-ember",
  },
];

const TIMELINE_TITLE = "Major Works & Achievements";

export default function Timeline() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const lineFillRef = useRef(null);
  const arrowRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text reveal
      gsap.fromTo(
        ".timeline-title-char",
        { opacity: 0.15, y: 30, filter: "brightness(0.3)" },
        {
          opacity: 1,
          y: 0,
          filter: "brightness(1)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-title-wrap",
            start: "top 88%",
            end: "top 55%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        ".timeline-header-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Continuous threshold-based scrubbed line fill & sliding arrow pointer
      gsap.to(lineFillRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 0.4,
          onUpdate: (self) => {
            if (arrowRef.current && containerRef.current) {
              const totalH = containerRef.current.clientHeight;
              const currentY = self.progress * totalH;

              // Dynamic color transition along brand gradient in Dark mode; Black & White in Light mode
              const isLightMode = document.documentElement.classList.contains("light-mode");
              let currentColor;

              if (isLightMode) {
                currentColor = "#000000";
              } else {
                if (self.progress <= 0.5) {
                  currentColor = gsap.utils.interpolate("#E8C87A", "#CE4615", self.progress * 2);
                } else {
                  currentColor = gsap.utils.interpolate("#CE4615", "#9E2A0B", (self.progress - 0.5) * 2);
                }
              }

              gsap.set(arrowRef.current, { y: currentY });

              if (isLightMode) {
                arrowRef.current.style.backgroundColor = "#000000";
                arrowRef.current.style.color = "#ffffff";
                arrowRef.current.style.boxShadow = `0 0 10px rgba(0,0,0,0.3)`;
              } else {
                arrowRef.current.style.backgroundColor = currentColor;
                arrowRef.current.style.color = "#0b0a08";
                arrowRef.current.style.boxShadow = `0 0 20px ${currentColor}, 0 0 35px ${currentColor}`;
              }
            }
          },
        },
      });

      // Card opacity reveal to 1.0 with default scale (1.0) and no reverse transitions on scroll
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const isEven = index % 2 === 0;
        const card = item.querySelector(".timeline-card");

        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? -30 : 30, y: 25 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              onToggle: (self) => {
                if (self.isActive) card?.classList.add("active-card");
                else card?.classList.remove("active-card");
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-ink pt-28 pb-10 lg:pt-36 lg:pb-16 overflow-hidden select-none"
    >
      {/* Brand signature gradient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-gradient-to-b from-bronze-light/10 via-bronze/10 to-ember/10 blur-[140px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-24 px-6 max-w-4xl mx-auto">
        <p className="timeline-header-item mb-4 text-xs uppercase tracking-wide-x text-bronze font-medium">
          A Journey Through Light &amp; Form
        </p>
        <h2 className="timeline-title-wrap font-display text-3xl leading-tight text-parchment sm:text-5xl lg:text-6xl font-medium tracking-wide flex flex-wrap justify-center overflow-hidden">
          {TIMELINE_TITLE.split("").map((char, index) => (
            <span
              key={index}
              className={`timeline-title-char inline-block origin-bottom ${
                char === "&" ? "text-bronze-light font-serif italic" : ""
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div className="timeline-header-item mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-bronze-light to-transparent" />
        <p className="timeline-header-item mt-6 text-sm text-mute leading-relaxed font-light max-w-xl mx-auto">
          Two decades of public monuments, light art, and structural innovation.
        </p>
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* Central Vertical Track Line */}
        <div className="timeline-track-line absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
          {/* Line Fill */}
          <div
            ref={lineFillRef}
            className="timeline-line-fill w-full h-0 bg-gradient-to-b from-bronze-light via-bronze to-ember shadow-[0_0_20px_rgba(206,70,21,0.8)]"
          />

          {/* Riding Arrow Pointer */}
          <div
            ref={arrowRef}
            className="absolute -left-[14px] top-0 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-bronze-light text-ink text-xs shadow-[0_0_20px_rgba(232,200,122,0.9)] transition-transform"
          >
            <FontAwesomeIcon icon={faChevronDown} className="animate-bounce text-[10px]" />
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="space-y-16 md:space-y-24">
          {TIMELINE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative flex items-center ${
                  isEven
                    ? "pl-14 md:pl-0 md:justify-end md:pr-[50%]"
                    : "pl-14 md:pl-[50%] md:justify-start"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`w-full ${
                    isEven ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div
                    className={`timeline-card ${item.themeClass} group relative rounded-xl border border-white/10 bg-surface/70 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
                  >
                    {/* Glowing Accent Bar */}
                    <div
                      className="timeline-accent-bar absolute left-0 top-6 bottom-6 w-1 rounded-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundColor: item.accentColor }}
                    />

                    {/* Category Pill & Year */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span
                        className="timeline-category-pill text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded transition-all duration-500"
                        style={{
                          backgroundColor: `${item.accentColor}18`,
                          borderColor: `${item.accentColor}40`,
                          color: item.accentColor,
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="timeline-year-text font-display text-xl sm:text-2xl font-bold tracking-wide transition-colors duration-500"
                        style={{ color: item.accentColor }}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="timeline-card-title font-display text-xl sm:text-2xl font-light text-parchment mb-3 leading-snug transition-colors duration-500">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-mute leading-relaxed font-light mb-5">
                      {item.description}
                    </p>

                    {/* Highlights List */}
                    <ul className="space-y-2 border-t border-white/8 pt-4">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-parchment/80 font-light">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="timeline-check-icon text-[10px] transition-colors duration-500"
                            style={{ color: item.accentColor }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Card glowing active states for bronze-light -> bronze -> ember themes */
        .timeline-card.theme-bronze-light.active-card {
          border-color: rgba(232, 200, 122, 0.45);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(232, 200, 122, 0.08) 100%);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(232, 200, 122, 0.15);
        }

        .timeline-card.theme-bronze.active-card {
          border-color: rgba(206, 70, 21, 0.45);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(206, 70, 21, 0.08) 100%);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(206, 70, 21, 0.2);
        }

        .timeline-card.theme-ember.active-card {
          border-color: rgba(158, 42, 11, 0.45);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(158, 42, 11, 0.08) 100%);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(158, 42, 11, 0.2);
        }

        .timeline-card.active-card .timeline-accent-bar {
          opacity: 1;
        }

        .timeline-card.active-card .timeline-card-title {
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}

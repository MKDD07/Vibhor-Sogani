import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "2024 – 2025",
    category: "Global Monumental Work",
    title: "London Design Biennale & Royal Caribbean",
    description:
      "Presented 'Silent Subtext' film at London Design Biennale 2025. Created a nine-deck-high 65ft wishing tree for Royal Caribbean's Utopia of the Seas. Awarded Lifetime Design Excellence Award (2025).",
    highlights: ["London Design Biennale 2025", "65ft Wishing Tree", "Lifetime Design Excellence Award"],  },
  {
    year: "2024",
    category: "Government Commission",
    title: "Kalpataru & Yashobhoomi IICC",
    description:
      "Created 'Kalpataru', a 20-ft light art installation for Project PARI, New Delhi. Commissioned centerpiece for Yashobhoomi IICC, inaugurated by PM Narendra Modi.",
    highlights: ["Project PARI, New Delhi", "Ashoka Chakra Motif", "Inaugurated by Prime Minister"],  },
  {
    year: "2023 – 2024",
    category: "International Light Art",
    title: "Pool of Dreams – Amsterdam Light Festival",
    description:
      "Selected as the only Indian artist for the 12th Amsterdam Light Festival. 'Pool of Dreams' is now part of Amsterdam's permanent Light Art Collection.",
    highlights: ["12th Amsterdam Light Festival", "Permanent Light Art Collection", "Solo Indian Selection"],  },
  {
    year: "2018",
    category: "Luxury Product Design",
    title: "SOGANI Luxury Lighting",
    description:
      "Launched bespoke luxury lighting collection at Light + Building, Frankfurt. Featured exhibition at Italian Ambassador's residence, New Delhi.",
    highlights: ["Light + Building, Frankfurt", "Italian Ambassador Residence", "Global Bespoke Collection"],  },
  {
    year: "2007 – 2010",
    category: "Iconic Public Art",
    title: "Sprouts & Kalpavriksha",
    description:
      "Created 'Sprouts', a 40-ft iconic public art installation in New Delhi celebrating India's growth, and 'Kalpavriksha', a 35-ft mirror-finished steel sculpture in Ahmedabad.",
    highlights: ["40-ft Sprouts, New Delhi", "35-ft Kalpavriksha, Ahmedabad", "Mirror-Finished Steel"],  },
  {
    year: "2002 – 2006",
    category: "Early Practice & Kinetics",
    title: "Exhibition Design & A'rise",
    description:
      "Designed large-scale exhibition pavilions for DRDO Defexpo. Created 'A'rise', a 22-ft kinetic steel sculpture for Airtel HQ, Gurugram.",
    highlights: ["DRDO Defexpo Pavilions", "22-ft Kinetic Sculpture", "Airtel HQ Landmark"],  },
];

export default function Timeline() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.chronology-header', {
          y: 20, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        });
        gsap.utils.toArray('.chronology-entry').forEach((entry) => {
          gsap.from(entry, {
            y: 24, opacity: 0, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: entry, start: 'top 90%', once: true },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative bg-ink py-24 lg:py-32">
      <div className="site-container ">
        <header className="chronology-header mb-14 grid gap-6 lg:mb-16 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div className="flex items-start gap-3 pt-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-bronze">Selected milestones</span>
          </div>
          <div>
            <h2 className="section-heading font-display text-4xl leading-tight text-parchment sm:text-5xl">A practice in light &amp; form</h2>
            <p className="site-prose mt-6 max-w-xl leading-relaxed text-mute">Two decades of public monuments, light art, and structural innovation.</p>
          </div>
        </header>

        <ol className="border-b border-parchment/15">
          {TIMELINE_DATA.map((item) => (
            <li key={item.year} className="chronology-entry group grid gap-5 border-t border-parchment/15 py-10 sm:py-14 lg:grid-cols-[220px_1fr] lg:gap-12">
              <div className="lg:pt-1">
                <span className="font-sans text-base font-medium tracking-[0.06em] text-parchment/80">{item.year.replace(/\s*[–—-]\s*/g, ' | ')}</span>
              </div>
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">{item.category}</span>
                <h3 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-parchment sm:text-4xl">{item.title}</h3>
                <p className="site-prose mt-5 max-w-2xl leading-relaxed text-mute">{item.description}</p>
                <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2" aria-label="Highlights">
                  {item.highlights.map((highlight, index) => (
                    <li key={highlight} className="flex items-center gap-3 text-xs leading-relaxed text-parchment/70">
                      {index > 0 && <span className="text-bronze/70" aria-hidden="true">|</span>}
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

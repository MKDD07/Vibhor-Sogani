import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";

gsap.registerPlugin(ScrollTrigger);

const NEWS_ARTICLES = [
  {
    source: "Architectural Digest",
    date: "June 2026",
    category: "Architecture & Monumental Art",
    title: "Inside the making of Kalpavriksha, Jaipur’s newest steel landmark",
    summary: "An in-depth exploration into the monumental stainless steel structure redefining public sculpture across urban landscapes.",
    link: "https://www.architecturaldigest.in/",
  },
  {
    source: "The Hindu",
    date: "February 2026",
    category: "Artist Profile",
    title: "Vibhor Sogani on scale, patina and public sculpture",
    summary: "How light and reflective geometry engage public communities and transform street-level architectural conversations.",
    link: "https://www.thehindu.com/",
  },
  {
    source: "Design Pataki",
    date: "November 2025",
    category: "Feature Essay",
    title: "Five installations that changed how India sees public art",
    summary: "From Sprouts at AIIMS to kinetic light works across the globe, examining the legacy of Vibhor Sogani's architectural practice.",
    link: "https://designpataki.com/",
  },
  {
    source: "Elle Decor",
    date: "August 2025",
    category: "Spatial Design",
    title: "The Poetry of Steel: Light Installations in Urban Metropolises",
    summary: "Vibhor Sogani discusses creating site-specific sculptures that harmonize industrial materials with nature.",
    link: "https://www.elledecor.in/",
  },
  {
    source: "India Today",
    date: "May 2025",
    category: "Honors & Awards",
    title: "Vibhor Sogani conferred Lifetime Design Excellence Award",
    summary: "A look back at 25 years of public commissions, jury memberships, and national design policy leadership.",
    link: "https://www.indiatoday.in/",
  },
];

export default function NewsPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
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
          Press &amp; Publications
        </span>
        <h1 className="about-title-words font-display text-4xl sm:text-6xl lg:text-7xl font-light text-parchment">
          News
        </h1>
        <p className="text-mute text-base sm:text-lg font-light mt-4 max-w-2xl">
          Editorials, architectural essays, and press coverage of Studio Vibhor Sogani's global public art works.
        </p>
      </section>

      {/* News Articles List */}
      <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="space-y-6">
          {NEWS_ARTICLES.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card group block p-8 sm:p-10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-bronze/40 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-black/10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-bronze-light px-2.5 py-0.5 rounded bg-bronze/10 border border-bronze/20">
                    {item.source}
                  </span>
                  <span className="text-xs text-mute font-mono">
                    {item.date}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-widest text-mute font-mono">
                  {item.category}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-white group-hover:text-bronze-light transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base font-light mt-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-bronze-light font-medium group-hover:translate-x-1.5 transition-transform duration-300 flex-shrink-0">
                  <span>Read Article</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                </div>
              </div>
            </a>
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

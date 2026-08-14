import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { 
  ArrowUpRight, 
  MapPin, 
  Sparkles, 
  Search, 
  Filter
} from "lucide-react";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";

gsap.registerPlugin(ScrollTrigger);

export default function MobileInstallationsCollection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const filteredProjects = projectsData.filter((proj) => {
    return (
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.location && proj.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (proj.description && proj.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // ── GSAP Scroll Trigger: Previous card scales down and lifts up as new card approaches ──
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".mobile-project-card");
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            scale: 1,
            y: 0,
            opacity: 1,
          },
          {
            scale: 0.93,
            y: -25,
            opacity: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 20%",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div ref={containerRef} className="min-h-screen bg-ink text-parchment pt-28 pb-20 px-5">
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-bronze font-mono font-semibold">
          <Sparkles className="w-3 h-3 text-bronze" />
          <span>Curated Works Portfolio</span>
        </div>
        <h1 className="font-display text-3xl font-light text-parchment leading-tight">
          Sculpture &amp; Public Art
        </h1>
        <p className="text-xs text-mute font-light leading-relaxed">
          Exploring scale, light, and materiality across {projectsData.length} site-specific public monuments.
        </p>
      </div>

      {/* ── Search Bar (Sticky at Top on Scroll Down) ────────────────────────── */}
      <div className="sticky top-0 z-30 -mx-5 px-5 py-3.5 bg-ink/95 backdrop-blur-md border-b border-white/10 mb-6 transition-all duration-300">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mute" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, location or medium..."
            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-surface-2/80 border border-mute/25 hover:border-mute/40 focus:border-bronze text-sm text-parchment placeholder-mute/60 outline-none transition-colors shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-mute/20 hover:bg-mute/40 flex items-center justify-center text-parchment text-[10px] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Installation Works Card Grid (1-Column Mobile Optimized with GSAP Scroll Scaling) ──────────── */}
      <div className="space-y-6">
        {filteredProjects.map((proj, idx) => {
          const firstImg = proj.images?.[0] || "";

          return (
            <Link
              key={proj.id}
              to={`/installations/${proj.slug}`}
              className="mobile-project-card block group bg-surface/70 rounded-2xl overflow-hidden shadow-xl transition-shadow duration-300 active:scale-[0.98] origin-top will-change-transform"
            >
              {/* Artwork Hero Image Card (4:5 Aspect Ratio) */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black/60 isolate rounded-2xl">
                <img
                  src={firstImg}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Fixed Non-Interfering Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />

                {/* Bottom Card Overlay Details */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 pointer-events-none">
                  <div className="max-w-[75%] space-y-1">
                    {proj.location && (
                      <span className="text-[9px] uppercase tracking-[0.2em] text-bronze-light font-medium block truncate">
                        {proj.location}
                      </span>
                    )}
                    <h2 className="font-display text-2xl text-parchment font-light leading-snug truncate">
                      {proj.title}
                    </h2>
                  </div>

                  {/* Open Arrow Button */}
                  <div className="w-9 h-9 rounded-full bg-bronze flex items-center justify-center text-white shadow-md shadow-bronze/30 group-hover:scale-110 transition-transform flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Bottom Synopsis */}
              <div className="p-4 pt-3">
                <p className="text-xs text-parchment/70 font-light leading-relaxed line-clamp-2">
                  {proj.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <p className="text-sm text-mute">No installations matched "{searchTerm}".</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("All");
            }}
            className="text-xs text-bronze uppercase tracking-wider font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Footer Support Sections ───────────────────────────────────────────── */}
      <div className="mt-20 space-y-12">
        <Newsletter />
        <Contact />
        <StudioBanner />
      </div>
    </div>
  );
}

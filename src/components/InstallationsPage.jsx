import React, { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(Flip, ScrollToPlugin);
import { projectsData } from "../data/projectsData";
import { ChevronLeft, ChevronRight, Share2, Link2, Check } from "lucide-react";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";
import AnimatedTextTicker from "./AnimatedTextTicker";

// Inline Swiper with embedded narrow paragraph card inside individual slide + large image
function InlineSwiper({ images, paragraphs }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const suppressClickRef = useRef(false);
  const isDragging = useRef(false);

  const GAP = 20;

  // Build strictly alternating sequence: Image -> Text -> Image -> Text -> Image -> Text
  const slideItems = useMemo(() => {
    const items = [];
    const maxLen = Math.max(images.length, paragraphs?.length || 0);
    for (let i = 0; i < maxLen; i++) {
      if (i < images.length) items.push({ type: 'image', content: images[i], index: i, id: 'img-' + i });
      if (paragraphs && i < paragraphs.length) items.push({ type: 'text', content: paragraphs[i], index: i, id: 'para-' + i });
    }
    return items;
  }, [images, paragraphs]);

  const totalSlides = slideItems.length;

  const getOffset = useCallback((i) => {
    if (!containerRef.current) return 0;
    const containerW = containerRef.current.clientWidth;
    let offset = 0;
    for (let idx = 0; idx < i; idx++) {
      const item = slideItems[idx];
      const wPercent = item.type === "image" ? (idx === 0 ? 100 : 85) : 45;
      offset += (containerW * wPercent) / 100 + GAP;
    }
    return -offset;
  }, [slideItems]);

  const goTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(totalSlides - 1, idx));
      gsap.to(trackRef.current, {
        x: getOffset(clamped),
        duration: 0.65,
        ease: "power3.inOut",
        overwrite: "auto",
      });
      setCurrent(clamped);
    },
    [totalSlides, getOffset]
  );

  const currentRef = useRef(current);
  currentRef.current = current;
  useEffect(() => {
    const track = trackRef.current;
    const observer = new ResizeObserver(() => {
      gsap.killTweensOf(track);
      gsap.set(track, { x: getOffset(currentRef.current) });
    });
    observer.observe(containerRef.current);
    return () => { observer.disconnect(); gsap.killTweensOf(track); };
  }, [getOffset]);

  const prev = (e) => {
    if (e) e.stopPropagation();
    goTo(current - 1);
  };

  const next = (e) => {
    if (e) e.stopPropagation();
    goTo(current + 1);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest("button")) return;
    suppressClickRef.current = false;
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const diffX = startX.current - endX;
    suppressClickRef.current = Math.abs(diffX) > 40;

    if (diffX > 40) {
      next();
    } else if (diffX < -40) {
      prev();
    }
  };

  return (
    <div
      className="relative h-full w-full select-none cursor-grab active:cursor-grabbing overflow-hidden"
      ref={containerRef}
      onClickCapture={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Interleaved Track Slider: Images (85% width) + Compact Paragraph Cards (45% width) */}
      <div ref={trackRef} className="flex h-full items-center" style={{ gap: `${GAP}px` }}>
        {slideItems.map((item, i) => {
          const isText = item.type === "text";
          const slideW = isText ? 45 : (i === 0 ? 100 : 85);

          return isText ? (
            <div
              key={item.id}
              className="relative flex-shrink-0 justify-center p-6 flex flex-col h-full overflow-y-auto rounded-none transition-opacity duration-300 cursor-pointer"
              style={{
                width: `${slideW}%`,
                opacity: current === i ? 1 : 0.5,
              }}
              onClick={() => goTo(i)}
            >
              <div className="max-w-[400px] ps-[64px]">
                <span className="text-[9px] uppercase tracking-[0.25em] font-semibold opacity-60 block mb-2">
                  Narrative — Part 0{item.index + 1}
                </span>
                <p
                  className={
                    "text-xs sm:text-sm leading-relaxed font-medium transition-opacity duration-700 ease-in-out  " +
                    (current === i ? "opacity-100" : "opacity-0 pointer-events-none")
                  }
                >
                  {item.content}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={item.id}
              className="relative h-full flex-shrink-0 overflow-hidden rounded-none transition-opacity duration-300 cursor-pointer"
              style={{
                width: `${slideW}%`,
                opacity: current === i ? 1 : 0.45,
              }}
              onClick={() => goTo(i)}
            >
              <img src={item.content} alt={`View ${i + 1}`} className="w-full h-full object-cover pointer-events-none" loading="lazy" />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-md border border-current/10 transition-all duration-300 disabled:opacity-0 cursor-pointer active:scale-95 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={current === totalSlides - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-md border border-current/10 transition-all duration-300 disabled:opacity-0 cursor-pointer active:scale-95 shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Counter Pill */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-6 z-20 px-3 py-1 rounded-full bg-neutral-900/10 dark:bg-white/10 border border-current/10 text-[10px] font-mono shadow-md backdrop-blur-md pointer-events-none">
          {String(current + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}

import MobileInstallationDetail from "./MobileInstallationDetail";
import MobileInstallationsCollection from "./MobileInstallationsCollection";

export default function InstallationsPage() {
  const { slug } = useParams();
  const [activeSwiperId, setActiveSwiperId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const idleTimerRef = useRef(null);
  const layoutStateRef = useRef(null);
  const layoutAnimationRef = useRef(null);
  const scrollTweenRef = useRef(null);

  useLayoutEffect(() => {
    scrollTweenRef.current?.kill();
    const centerWork = () => {
      if (!activeSwiperId || isMobile) return;
      const project = projectsData.find((item) => item.id === activeSwiperId);
      const article = document.getElementById(project?.slug);
      const frame = article?.querySelector('.installation-image-frame');
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      // Center the artwork below the fixed navigation, using its final dimensions.
      const headerHeight = 80;
      const availableHeight = window.innerHeight - headerHeight;
      const target = window.scrollY + rect.top - headerHeight - (availableHeight - rect.height) / 2;
      scrollTweenRef.current = gsap.to(window, {
        scrollTo: { y: Math.max(0, target), autoKill: true },
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.9,
        ease: 'power3.inOut',
      });
    };
    if (layoutStateRef.current) {
      layoutAnimationRef.current?.kill();
      layoutAnimationRef.current = Flip.from(layoutStateRef.current, {
        duration: 0.6, ease: 'power3.inOut', onComplete: centerWork,
      });
      layoutStateRef.current = null;
    } else {
      centerWork();
    }
  }, [activeSwiperId, isMobile]);

  useEffect(() => () => {
    layoutAnimationRef.current?.kill();
    scrollTweenRef.current?.kill();
  }, []);

  // Monitor window resize to switch between mobile and desktop layout cleanly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Matched project for single mobile detail page (/installations/:slug)
  const matchedProject = slug ? projectsData.find((p) => p.slug === slug || p.id === slug) : null;

  // Sync active item from URL parameter or Hash (BIG.dk pattern on page load / Google deep link for desktop)
  useEffect(() => {
    const targetSlug = slug || window.location.hash.replace("#", "");
    if (targetSlug) {
      const matchedProj = projectsData.find((p) => p.slug === targetSlug || p.id === targetSlug);
      if (matchedProj) {
        setActiveSwiperId(matchedProj.id);
      }
    }
  }, [slug]);

  // Handle item click / expand: Updates URL slug dynamically like BIG.dk and centers the item in viewport
  const handleItemClick = useCallback((proj) => {
    if (activeSwiperId === proj.id || layoutAnimationRef.current?.isActive()) return;
    layoutStateRef.current = Flip.getState(".installation-layout-panel, .installation-image-frame");
    setActiveSwiperId(proj.id);
    window.history.replaceState(null, "", `/installations/${proj.slug}`);
    
  }, [activeSwiperId]);

  // Handle collapse: Resets URL back to /installations
  const handleCollapse = useCallback(() => {
    layoutStateRef.current = Flip.getState(".installation-layout-panel, .installation-image-frame");
    setActiveSwiperId(null);
    window.history.replaceState(null, "", "/installations");
  }, []);

  // Share handler: Web Share API fallback to Clipboard Copy with /installations/slug URL
  const handleShare = useCallback((e, proj) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/installations/${proj.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${proj.title} | Vibhor Sogani Public Art`,
        text: `Explore ${proj.title} by artist Vibhor Sogani`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(proj.id);
        setTimeout(() => setCopiedId(null), 2500);
      });
    }
  }, []);

  // Function to reset the 15-second idle collapse timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (activeSwiperId) {
      idleTimerRef.current = setTimeout(() => {
        handleCollapse();
      }, 15000);
    }
  }, [activeSwiperId, handleCollapse]);

  // Global mousemove / touch listener to reset 15s idle timer when active
  useEffect(() => {
    if (!activeSwiperId) return;

    resetIdleTimer();

    const handleActivity = () => resetIdleTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, [activeSwiperId, resetIdleTimer]);

  // JSON-LD Structured Data Schema for Google Search Indexing
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Public Art & Architectural Installations by Vibhor Sogani",
    "description": "Exhibition portfolio of site-specific public art sculptures and architectural installations.",
    "itemListElement": projectsData.map((proj, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "VisualArtwork",
        "name": proj.title,
        "description": proj.description,
        "artist": {
          "@type": "Person",
          "name": "Vibhor Sogani"
        },
        "image": proj.images?.[0] ? `${window.location.origin}${proj.images[0]}` : undefined,
        "url": `${window.location.origin}/installations#${proj.slug}`
      }
    }))
  };

  // ── On Mobile Devices (< 768px): Render dedicated mobile experience ──────────
  if (isMobile) {
    if (slug && matchedProject) {
      // 1. Mobile Individual Installation Detail Page (/installations/:slug)
      return <MobileInstallationDetail project={matchedProject} />;
    }
    // 2. Mobile Collection Catalog Page (/installations)
    return <MobileInstallationsCollection />;
  }

  // ── On Desktop & Tablets (> 768px): Render original architectural layout ──────
  return (
    <div id="installations-page" className="min-h-screen pt-32 pb-28 overflow-x-clip">
      {/* Google SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {/* Page Header */}
      <div className="site-container mb-16 border-b border-current/10 pb-8">
        <span className="text-[11px] uppercase tracking-[0.3em] opacity-60 font-semibold">
          Architectural Portfolio
        </span>
        <h1 className="page-heading about-title-words font-display font-light mt-2">
          Installations &amp; Public Art
        </h1>
      </div>

      {/* Vertical List of Architectural Items */}
      <div className="site-container space-y-6">
        {projectsData.map((proj) => {
          const isSwiperActive = activeSwiperId === proj.id;
          const mainImg = proj.images?.[0] ?? "";
          const images = proj.images ?? [];

          return (
            <article
              key={proj.id}
              id={proj.slug}
              className="group pb-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* LEFT INFO PANEL - Dynamic Column Span Expansion */}
                <div
                  className={
                    "installation-layout-panel flex flex-col items-end justify-center text-right space-y-4 pr-0 lg:pr-4 pt-2 " +
                    (isSwiperActive ? "lg:col-span-3" : "lg:col-span-4")
                  }
                >
                  <div>
                    <h2
                      className={
                        "font-display leading-tight " +
                        (isSwiperActive
                          ? "text-2xl sm:text-3xl font-normal tracking-wide"
                          : "text-[20px] font-light opacity-80 hover:opacity-100 tracking-normal")
                      }
                    >
                      {proj.title}
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-medium mt-2">
                      {proj.location || "Public & Architectural Installation"}
                    </p>
                  </div>

                  {/* Single Summary Description & Bottom Social Share Icons */}
                  <div
                    className={
                      "overflow-hidden max-w-sm " +
                      (isSwiperActive
                        ? "max-h-96 opacity-100 pt-3 border-t border-current/10"
                        : "max-h-0 opacity-0 pt-0 border-t-0")
                    }
                  >
                    <p className="site-prose text-sm leading-relaxed font-medium opacity-90">
                      {proj.description}
                    </p>

                    {/* Clean Mini Social Share Icons at Bottom End */}
                    <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-current/10">
                      <span className="text-[9px] uppercase tracking-widest opacity-50 font-mono mr-1">
                        Share
                      </span>

                      {/* Direct Link Copy */}
                      <button
                        onClick={(e) => handleShare(e, proj)}
                        title="Copy Direct Link"
                        className="w-7 h-7 rounded-full border border-current/20 flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95 text-current"
                      >
                        {copiedId === proj.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Link2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Native Web Share API */}
                      <button
                        onClick={(e) => handleShare(e, proj)}
                        title="Share Installation"
                        className="w-7 h-7 rounded-full border border-current/20 flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95 text-current"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL - Large Image / Swiper Container */}
                <div
                  className={
                    "installation-layout-panel overflow-hidden " +
                    (isSwiperActive ? "lg:col-span-9" : "lg:col-span-8")
                  }
                >
                  <div
                    onClick={() => handleItemClick(proj)}
                    className={
                      "installation-image-frame relative aspect-[16/10] overflow-hidden rounded-none cursor-pointer group/img " +
                      (isSwiperActive ? "w-full max-w-none" : "w-full max-w-2xl lg:w-[700px]")
                    }
                  >
                    {isSwiperActive ? (
                      <InlineSwiper
                        images={images}
                        paragraphs={proj.paragraphs}
                      />
                    ) : (
                      <img
                        src={mainImg}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/img:scale-103"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modern Newsletter & Studio Contact Sections */}
      <div className="mt-28 pt-16 space-y-16 ">
        <Newsletter />
      </div>

      {/* GSAP Velocity Text Marquee Divider */}
      <div className="-mx-6 lg:-mx-16 mt-20">
        <AnimatedTextTicker />
      </div>
        <Contact />

      {/* Full-width Edge-to-Edge Studio Banner */}
      <div className="-mx-6 lg:-mx-16">
        <StudioBanner />
      </div>
    </div>
  );
}

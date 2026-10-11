import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faArrowUpRightFromSquare,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { PrimaryButton } from "./Buttons";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// GSAP Image Slider — full-panel images, drag + arrow navigation
// ─────────────────────────────────────────────────────────────────────────────
function ImageSlider({ images, onClose }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const measuredWidth = useRef(0);

  const PEEK = 72; // px of next slide peeking
  const GAP  = 12; // px gap between slides

  const getOffset = useCallback((i) => {
    if (!containerRef.current) return 0;
    const slideW = containerRef.current.clientWidth - PEEK;
    return -(i * (slideW + GAP));
  }, []);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(images.length - 1, idx));
    gsap.to(trackRef.current, {
      x: getOffset(clamped),
      duration: 0.72,
      ease: "power3.inOut",
      overwrite: "auto",
    });
    setCurrent(clamped);
  }, [images.length, getOffset]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const observer = new ResizeObserver(() => {
      if (container.clientWidth === measuredWidth.current) return;
      measuredWidth.current = container.clientWidth;
      gsap.killTweensOf(track);
      gsap.set(track, { x: getOffset(current) });
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [current, getOffset]);

  useEffect(() => {
    const track = trackRef.current;
    return () => gsap.killTweensOf(track);
  }, []);

  // keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, onClose]);

  // drag / swipe
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const onDown = (e) => { startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0; };
    const onUp   = (e) => {
      const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
      const diff = startX.current - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) next();
        else prev();
      }
    };
    el.addEventListener("mousedown",  onDown);
    el.addEventListener("mouseup",    onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend",   onUp);
    return () => {
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("mouseup",    onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend",   onUp);
    };
  }, [next, prev]);

  return (
    <div className="relative w-full h-full flex flex-col select-none" ref={containerRef}>
      {/* Track */}
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ gap: `${GAP}px` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 h-full"
              style={{ width: `calc(100% - ${PEEK}px)` }}
            >
              <img
                src={img}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i < 2 ? "eager" : "lazy"}
                draggable={false}
              />
              {/* dim non-active */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-500"
                style={{ opacity: i === current ? 0 : 0.42 }}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-ink/60 border border-white/15 text-parchment backdrop-blur-sm hover:bg-bronze hover:border-bronze hover:text-ink transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          aria-label="Previous"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
        </button>
        <button
          onClick={next}
          disabled={current === images.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-ink/60 border border-white/15 text-parchment backdrop-blur-sm hover:bg-bronze hover:border-bronze hover:text-ink transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          aria-label="Next"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <span className="text-xs font-mono text-white/60 bg-ink/50 backdrop-blur-sm px-3 py-1 rounded-full">
            {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Dot strip */}
      <div className="h-12 flex items-center justify-center gap-2 bg-ink/70 backdrop-blur-sm flex-shrink-0 border-t border-white/8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "28px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#CE4615" : "rgba(255,255,255,0.25)",
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Installations component
// ─────────────────────────────────────────────────────────────────────────────
export default function Installations() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const stripRef = useRef(null);
  const itemRefs = useRef([]);
  const infoPanelRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage;
  const maxIndex = Math.max(0, projectsData.length - 5);
  const showcaseItems = projectsData.slice(startIndex, startIndex + 5);

  const expansionRef = useRef(null);
  const pageTweenRef = useRef(null);
  const pagingRef = useRef(false);
  const outgoingRef = useRef(null);
  const pageDirectionRef = useRef(1);
  const dragRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const suppressClickRef = useRef(false);

  const handleStripPointerDown = (event) => {
    if (activeIdx !== null || pagingRef.current || event.button !== 0 || event.target.closest('button, a')) return;
    suppressClickRef.current = false;
    dragRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, dragging: false };
  };

  const handleStripPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.dragging) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        dragRef.current = null;
        return;
      }
      if (Math.abs(dx) < 10) return;
      drag.dragging = true;
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const step = stripRef.current.clientWidth / showcaseItems.length;
    const atEdge = dx > 0 ? currentPage === 0 : currentPage === maxIndex;
    dragOffsetRef.current = Math.max(-step, Math.min(step, dx)) * (atEdge ? 0.2 : 1);
    gsap.set(stripRef.current, { x: dragOffsetRef.current });
  };

  const finishStripDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const offset = dragOffsetRef.current;
    const direction = offset < 0 ? 1 : -1;
    if (event.type !== 'pointercancel' && Math.abs(offset) > 40 && currentPage + direction >= 0 && currentPage + direction <= maxIndex) {
      changePage(direction);
    } else {
      dragOffsetRef.current = 0;
      pageTweenRef.current = gsap.to(stripRef.current, { x: 0, duration: 0.3, ease: 'power3.out' });
    }
  };

  const changePage = (direction) => {
    const target = Math.max(0, Math.min(maxIndex, currentPage + direction));
    if (pagingRef.current || target === currentPage) return;
    pagingRef.current = true;
    expansionRef.current?.kill();
    const strip = stripRef.current;
    const outgoing = strip.cloneNode(true);
    outgoing.setAttribute('aria-hidden', 'true');
    outgoing.inert = true;
    Object.assign(outgoing.style, {
      position: 'absolute', inset: '0', width: '100%', pointerEvents: 'none',
    });
    Array.from(outgoing.children).forEach((card) => {
      gsap.set(card, { width: '20%', opacity: 1, y: 0, scale: 1 });
      // Keep the collapsed artwork in the outgoing snapshot.
      if (card.children.length > 1) card.lastElementChild.remove();
    });
    strip.parentElement.appendChild(outgoing);
    outgoingRef.current = outgoing;
    pageDirectionRef.current = direction;
    setActiveIdx(null);
    setCurrentPage(target);
  };

  const handlePrevPage = () => changePage(-1);
  const handleNextPage = () => changePage(1);

  useLayoutEffect(() => {
    if (!pagingRef.current) return;
    const strip = stripRef.current;
    const outgoing = outgoingRef.current;
    const step = strip.clientWidth / showcaseItems.length;
    const direction = pageDirectionRef.current;
    gsap.set(itemRefs.current.filter(Boolean), {
      width: (100 / showcaseItems.length) + '%', opacity: 1, y: 0, scale: 1,
    });
    gsap.set(strip, { x: direction * step + dragOffsetRef.current, opacity: 1 });
    dragOffsetRef.current = 0;
    pageTweenRef.current = gsap.timeline({
      onComplete: () => {
        outgoing?.remove();
        outgoingRef.current = null;
        pagingRef.current = false;
      },
    })
      .to(strip, { x: 0, duration: 0.55, ease: 'power3.inOut' }, 0)
      .to(outgoing, { x: -direction * step, duration: 0.55, ease: 'power3.inOut' }, 0);
  }, [currentPage, showcaseItems.length]);

  useEffect(() => () => {
    pageTweenRef.current?.kill();
    outgoingRef.current?.remove();
  }, []);

  const installationsTitle = "Installation Arts";

  // ── Seamless Entry Animation ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category label reveal
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      // Title character-by-character 3D reveal
      gsap.fromTo(
        ".installations-title-char",
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.04,
          duration: 0.85,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Staggered 3D card fold-in entrance for the 5 showcase items
      const cards = itemRefs.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 70, scale: 0.92, transformOrigin: "top center" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: stripRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Expand / Collapse (Desktop) ──────────────────────────────────────────
  const expandItem = useCallback((idx) => {
    setActiveIdx((previous) => previous === idx ? null : idx);
  }, []);

  useEffect(() => {
    expansionRef.current?.kill();
    const cards = itemRefs.current.filter(Boolean);
    const timeline = gsap.timeline();
    expansionRef.current = timeline;

    cards.forEach((card, idx) => {
      timeline.to(card, {
        width: activeIdx === null ? (100 / cards.length) + '%' : idx === activeIdx ? '100%' : '0%',
        duration: 0.75,
        ease: 'power3.inOut',
        overwrite: 'auto',
      }, 0);
    });

    if (activeIdx !== null && infoPanelRef.current) {
      timeline.fromTo(infoPanelRef.current.parentElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        0.35);
      timeline.fromTo(infoPanelRef.current.querySelectorAll('.reveal-row'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.045 },
        0.45);
    }

    return () => timeline.kill();
  }, [activeIdx, currentPage]);

  const handleClose = useCallback(() => {
    if (activeIdx !== null) expandItem(activeIdx);
  }, [activeIdx, expandItem]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const modalSheetRef = useRef(null);
  const modalBackdropRef = useRef(null);
  const galleryTouchStartX = useRef(0);

  const openMobileModal = (proj) => {
    setModalProject(proj);
    setModalImageIdx(0);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sheet = modalSheetRef.current;
    const backdrop = modalBackdropRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      gsap.killTweensOf([sheet, backdrop].filter(Boolean));
    };
  }, [modalOpen]);

  const closeMobileModal = useCallback(() => {
    if (modalSheetRef.current && modalBackdropRef.current) {
      gsap.to(modalBackdropRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(modalSheetRef.current, {
        y: "100%",
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          setModalOpen(false);
          setModalProject(null);
        },
      });
    } else {
      setModalOpen(false);
      setModalProject(null);
    }
  }, []);

  useEffect(() => {
    if (modalOpen && modalSheetRef.current && modalBackdropRef.current) {
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        modalSheetRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.55, ease: "power4.out" }
      );
    }
  }, [modalOpen]);

  // Gallery swipe support on modal
  const handleGalleryTouchStart = (e) => {
    galleryTouchStartX.current = e.touches[0].clientX;
  };

  const handleGalleryTouchEnd = (e, total) => {
    const diff = galleryTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next
        setModalImageIdx((prev) => (prev < total - 1 ? prev + 1 : 0));
      } else {
        // swipe right -> prev
        setModalImageIdx((prev) => (prev > 0 ? prev - 1 : total - 1));
      }
    }
  };

  return (
    <section
      id="installations"
      ref={sectionRef}
      className="relative bg-ink pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="site-container mb-8 md:mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p ref={labelRef} className="mb-4 text-[11px] uppercase tracking-[0.32em] text-bronze font-semibold">
              Selected Works
            </p>
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="section-heading font-display text-3xl leading-tight text-parchment sm:text-5xl font-extralight leading-none flex flex-wrap overflow-hidden"
              >
                {installationsTitle.split("").map((char, index) => (
                  <span key={index} className="installations-title-char inline-block origin-bottom">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Desktop Pagination Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-none border-b border-white/15 flex items-center justify-center text-parchment hover:text-bronze hover:border-bronze transition-colors duration-300 cursor-pointer disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed group active:scale-95"
              aria-label="Previous installation"
            >
              <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === maxIndex}
              className="w-10 h-10 rounded-none border-b border-white/15 flex items-center justify-center text-parchment hover:text-bronze hover:border-bronze transition-colors duration-300 cursor-pointer disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed group active:scale-95"
              aria-label="Next installation"
            >
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <Link to="/installations" aria-label="View all installations" title="View all installations" className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-bronze/50 text-parchment transition-colors duration-300 hover:border-bronze">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-bronze transition-transform duration-500 group-hover:scale-y-100" />
              <ArrowRight className="relative z-10 h-4 w-4 -rotate-45 transition-transform duration-300 ease-out group-hover:-rotate-90 group-hover:text-ink" />
            </Link>
          </div>
        </div>
        <div className="mt-8 h-px bg-white/6" />
      </div>

      {/* ── Mobile View (< 768px): 1.2 Card Ratio Swiper ────────────────────── */}
      <div className="block md:hidden px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-6 px-6">
          {projectsData.slice(0, 10).map((proj) => {
            const firstImg = proj.images?.[0] || "";
            return (
              <div
                key={proj.id}
                onClick={() => openMobileModal(proj)}
                className="flex-none snap-start w-[83vw] max-w-[340px] aspect-[4/5] relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
              >
                <img
                  src={firstImg}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze-light font-medium block">
                    {proj.location || "Installation"}
                  </span>
                  <h3 className="font-display text-2xl text-parchment font-light leading-snug">
                    {proj.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Desktop Accordion Strip (> 768px) ─────────────────────────────────── */}
      <div className="site-container hidden md:block">
        <div className="relative overflow-hidden rounded-sm select-none" style={{ touchAction: 'pan-y', cursor: activeIdx === null ? 'grab' : 'auto' }}
          onPointerDown={handleStripPointerDown}
          onPointerMove={handleStripPointerMove}
          onPointerUp={finishStripDrag}
          onPointerCancel={finishStripDrag}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
            }
          }}>
        <div
          ref={stripRef}
          className="relative z-10 flex overflow-hidden rounded-sm"
          style={{ height: "74vh", minHeight: "500px", maxHeight: "800px" }}
        >
          {showcaseItems.map((proj, idx) => {
            const isActive = activeIdx === idx;
            const imgs = proj.images ?? [];
            const firstImg = imgs[0] ?? "";

            return (
              <div
                key={proj.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                className="relative overflow-hidden flex-none border-r border-white/8 last:border-r-0"
                style={{ width: "20%", opacity: 1 }}
              >
                {/* ── Collapsed: clickable bg card ─────────────────────────── */}
                {(
                  <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={() => expandItem(idx)}
                  >
                    <img
                      src={firstImg}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{ filter: activeIdx !== null ? "brightness(0.3)" : "brightness(0.6)" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />

                    {/* Collapsed labels */}
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6 pointer-events-none select-none">
                      <span
                        className="font-display text-2xl leading-tight text-parchment font-light"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {proj.title}
                      </span>
                      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center text-bronze opacity-0 group-hover:opacity-100 transition-opacity">
                        <FontAwesomeIcon icon={faChevronUp} className="text-xs" />
                      </span>
                    </div>
                  </div>
                )}

                {/* ── Expanded: full panel ─────────────────────────────────── */}
                {isActive && (
                  <div className="absolute inset-0 flex">
                    {/* LEFT INFO PANEL */}
                    <div
                      ref={infoPanelRef}
                      data-lenis-prevent
                      className="w-[40%] flex-shrink-0 flex flex-col justify-between py-8 px-8 bg-ink/90 backdrop-blur-md border-r border-white/8 overflow-y-auto z-10"
                    >
                      <div className="space-y-5 flex-1">
                        <div className="reveal-row" style={{ opacity: 0 }}>
                          <span className="text-[10px] uppercase tracking-[0.25em] text-bronze">
                            {String(idx + 1).padStart(2, "0")} / {String(showcaseItems.length).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="reveal-row" style={{ opacity: 0 }}>
                          <h3 className="font-display text-2xl text-parchment font-light leading-tight">
                            {proj.title}
                          </h3>
                          {proj.location && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-mute font-medium mt-1.5">
                              {proj.location}
                            </p>
                          )}
                          <div className="mt-3 h-px w-10 bg-bronze" />
                        </div>

                        <div className="reveal-row" style={{ opacity: 0 }}>
                          <p className="site-prose text-[12px] leading-[1.9] text-parchment/70 font-light whitespace-pre-line">
                            {proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="reveal-row flex-shrink-0 pt-6 mt-6 border-t border-white/8 space-y-3" style={{ opacity: 0 }}>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest text-mute mb-0.5">Medium</p>
                          <p className="text-[11px] text-parchment/80">Stainless Steel · Light</p>
                        </div>
                        <div className="pt-2">
                          <Link
                            to={`/installations/${proj.slug}`}
                            className="inline-block"
                            onClick={handleClose}
                          >
                            <PrimaryButton showIcon={false} className="!px-6 !py-2.5 !text-xs !gap-2.5">
                              <span>View Work</span>
                              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="relative z-10 text-[10px] ml-1" />
                            </PrimaryButton>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: GSAP Image Slider ─────────────────────────────── */}
                    <div className="flex-1 relative overflow-hidden">
                      <ImageSlider images={imgs} onClose={handleClose} />
                    </div>

                    {/* Close button */}
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-ink/70 border border-white/20 text-parchment text-sm hover:bg-bronze hover:border-bronze hover:text-ink transition-all cursor-pointer"
                      aria-label="Close"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        </div>


      </div>

      {/* ── Mobile Bottom Sheet Modal (< 768px) ─────────────────────────────── */}
      {modalOpen && modalProject && (
        <div 
          ref={modalBackdropRef}
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-lg"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobileModal();
          }}
        >
          <div 
            ref={modalSheetRef}
            className="w-full bg-[#13110c] border-t border-white/15 rounded-t-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
          >
            {/* Grabber Handle */}
            <div className="pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-white/25" />
            </div>

            {/* Modal Header Bar */}
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-surface-2/60">
              <div className="max-w-[80%]">
                <span className="text-[9px] uppercase tracking-[0.25em] text-bronze-light block font-semibold">
                  {modalProject.location || "Public Sculpture"}
                </span>
                <h3 className="font-display text-lg text-parchment truncate font-light mt-0.5">
                  {modalProject.title}
                </h3>
              </div>
              <button
                onClick={closeMobileModal}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-parchment hover:bg-bronze hover:text-ink transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>

            {/* Modal Body: Gallery Image & Content */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Main Active Image with Touch Swipe and Nav Arrows */}
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 select-none"
                onTouchStart={handleGalleryTouchStart}
                onTouchEnd={(e) => handleGalleryTouchEnd(e, modalProject.images?.length || 1)}
              >
                <img
                  key={modalImageIdx}
                  src={modalProject.images?.[modalImageIdx] || modalProject.images?.[0]}
                  alt={modalProject.title}
                  className="w-full h-full object-cover transition-opacity duration-300 animate-fadeIn"
                />
                
                {/* Image Nav Arrows */}
                {modalProject.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setModalImageIdx((prev) => (prev > 0 ? prev - 1 : modalProject.images.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 active:scale-90 transition-transform cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setModalImageIdx((prev) => (prev < modalProject.images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 active:scale-90 transition-transform cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10">
                  {modalImageIdx + 1} / {modalProject.images?.length || 1}
                </div>
              </div>

              {/* Thumbnails Row */}
              {modalProject.images?.length > 1 && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-mute mb-2">Gallery Thumbnails</p>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {modalProject.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setModalImageIdx(i)}
                        className={`flex-none w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                          modalImageIdx === i ? "border-bronze scale-105 shadow-md shadow-bronze/20 opacity-100" : "border-white/15 opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description and Case Study Link */}
              <div className="space-y-4 pt-1 border-t border-white/10">
                <p className="site-prose text-xs sm:text-sm text-parchment/80 font-light leading-relaxed whitespace-pre-line">
                  {modalProject.description}
                </p>

                <div className="pt-2">
                  <Link
                    to={`/installations/${modalProject.slug}`}
                    onClick={closeMobileModal}
                    className="inline-block w-full"
                  >
                    <PrimaryButton showIcon={false} className="w-full justify-center !py-3.5 !gap-2">
                      <span>View Installation</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="relative z-10 text-xs ml-1" />
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes imgSlideIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

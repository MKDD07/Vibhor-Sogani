import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Check, 
  MapPin
} from "lucide-react";
import Newsletter from "./Newsletter";
import Contact from "./Contact";
import StudioBanner from "./StudioBanner";

gsap.registerPlugin(ScrollTrigger);

export default function MobileInstallationDetail({ project }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  if (!project) return null;

  const images = project.images || [];
  const paragraphs = project.paragraphs || [];
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  // Remaining images and paragraphs (excluding feature image 0)
  const remainingImages = images.slice(1);
  const remainingBlocks = [];
  const maxItems = Math.max(remainingImages.length, paragraphs.length);

  for (let i = 0; i < maxItems; i++) {
    if (i < remainingImages.length) {
      remainingBlocks.push({ type: "image", src: remainingImages[i], index: i + 1 });
    }
    if (i < paragraphs.length) {
      remainingBlocks.push({ type: "text", content: paragraphs[i], index: i });
    }
  }

  // ── GSAP Scroll Trigger: Scale down and elevate previous block as user scrolls down ──
  useEffect(() => {
    if (!containerRef.current) return;

    const blocks = containerRef.current.querySelectorAll(".mobile-story-block");
    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          {
            scale: 1,
            y: 0,
            opacity: 1,
          },
          {
            scale: 0.94,
            y: -20,
            opacity: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 25%",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project.id]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${project.title} | Vibhor Sogani`,
        text: project.description,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-ink text-parchment pb-24">
      {/* ── Sticky Top Navigation Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-ink/90 backdrop-blur-xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/installations")}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-parchment/80 hover:text-bronze active:scale-95 transition-all cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-bronze" />
          <span>All Works</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-parchment active:scale-90 transition-all cursor-pointer"
            aria-label="Share"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 1. Featured Hero Artwork Image (First on Top) ────────────────────── */}
      <div className="relative w-full aspect-[4/3] bg-black/60 overflow-hidden shadow-2xl">
        <img
          src={images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Heading, Location, Metadata & Lead Synopsis ───────────────────── */}
      <div className="px-5 pt-6 pb-6 space-y-4">
        <div className="space-y-2">
          {project.location && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bronze/15 border border-bronze/30 text-bronze text-[10px] uppercase tracking-wider font-semibold">
              <MapPin className="w-3 h-3" />
              <span>{project.location}</span>
            </div>
          )}
          <h1 className="font-display text-3xl sm:text-4xl font-light text-parchment leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Medium & Category Attributes */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-mute block">Medium</span>
            <p className="text-xs text-parchment font-medium">Stainless Steel &amp; Light</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-surface/80 border border-white/5 space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-mute block">Type</span>
            <p className="text-xs text-parchment font-medium">Public Sculpture</p>
          </div>
        </div>

        {/* Lead Synopsis */}
        <div className="pt-2">
          <p className="text-sm leading-relaxed text-parchment/90 font-light whitespace-pre-line">
            {project.description}
          </p>
        </div>
      </div>

      {/* ── 3. Remaining Alternating Story Stream: Image -> Text -> Image -> Text with GSAP Scroll Scaling ── */}
      {remainingBlocks.length > 0 && (
        <div className="px-5 space-y-6 pt-2">
          {remainingBlocks.map((block, idx) => {
            if (block.type === "image") {
              return (
                <div
                  key={`img-${block.index}`}
                  className="mobile-story-block relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 shadow-xl origin-top will-change-transform"
                >
                  <img
                    src={block.src}
                    alt={`${project.title} - View ${block.index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            }

            return (
              <div
                key={`text-${block.index}`}
                className="bio-block mobile-story-block group relative p-6 sm:p-10 rounded-3xl bg-[#15130e] backdrop-blur-xl transition-all duration-500 shadow-2xl origin-top will-change-transform"
              >
                <p className="text-xs sm:text-sm text-parchment/85 leading-relaxed font-light">
                  {block.content}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Next / Previous Project Navigation ────────────────────────────────── */}
      <div className="px-5 pt-12 mt-12 border-t border-white/10 space-y-4">
        <span className="text-[10px] uppercase tracking-widest text-mute block font-mono">
          Explore Other Works
        </span>

        <div className="grid grid-cols-2 gap-3">
          {prevProject ? (
            <Link
              to={`/installations/${prevProject.slug}`}
              className="p-3.5 rounded-2xl bg-surface border border-white/5 flex flex-col justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-mute mb-2">
                <ChevronLeft className="w-3 h-3" />
                <span>Previous</span>
              </div>
              <p className="font-display text-xs text-parchment group-hover:text-bronze line-clamp-1">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/installations/${nextProject.slug}`}
              className="p-3.5 rounded-2xl bg-surface border border-white/5 flex flex-col justify-between items-end text-right group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-mute mb-2">
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              <p className="font-display text-xs text-parchment group-hover:text-bronze line-clamp-1">
                {nextProject.title}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* ── Footer Support Sections ───────────────────────────────────────────── */}
      <div className="mt-16 space-y-12">
        <Newsletter />
        <Contact />
        <StudioBanner />
      </div>
    </div>
  );
}

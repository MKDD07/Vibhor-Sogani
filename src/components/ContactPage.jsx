import React, { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton, GhostButton } from "./Buttons";
import StudioBanner from "./StudioBanner";
import Newsletter from "./Newsletter";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const formSectionRef = useRef(null);

  const [state, handleSubmit] = useForm("xjybolld");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on banner image
      gsap.fromTo(
        parallaxImgRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Smooth scrub reveal on content
      gsap.fromTo(
        ".minimal-contact-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-ink min-h-screen text-parchment">
      {/* ── Minimalist Parallax Hero Banner ─────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[55vh] min-h-[420px] w-full overflow-hidden flex items-end pb-16 pt-24"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-ink">
          <img
            ref={parallaxImgRef}
            src="/images/contact/contact-001.png"
            alt="Studio Vibhor Sogani Sculptural Work"
            className="h-[135%] w-full object-cover object-center opacity-85 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <span className="text-xs uppercase tracking-wide-x text-bronze-light font-semibold block mb-3">
            Contact &amp; Commissions
          </span>
          <h1 className="about-title-words font-display text-4xl sm:text-6xl lg:text-7xl font-light text-parchment">
            Start a Conversation
          </h1>
        </div>
      </section>

      {/* ── Minimalist Contact Section ──────────────────────────────────── */}
      <section ref={formSectionRef} className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Clean Editorial Studio Info */}
          <div className="lg:col-span-5 space-y-10 minimal-contact-reveal">
            <div>
              <h2 className="about-title-lift font-display text-2xl sm:text-3xl font-light leading-snug">
                Studio Vibhor Sogani
              </h2>
              <p className="text-mute text-sm sm:text-base font-light mt-3 leading-relaxed">
                Sculptures engineered for urban public environments and architectural landmark commissions globally.
              </p>
            </div>

            <div className="space-y-6 text-sm text-neutral-300 font-light border-t border-white/10 pt-8">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-mute block mb-1">
                  Location
                </span>
                <p className="text-white">Gurugram, National Capital Region, India</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-mute block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:studio@sogani.design"
                  className="text-bronze-light hover:text-white transition-colors"
                >
                  studio@sogani.design
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-mute block mb-1">
                  Studio Response
                </span>
                <p className="text-neutral-400">Monday &mdash; Saturday (within 24–48h)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Minimal Underline Input Form */}
          <div className="lg:col-span-7 minimal-contact-reveal">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase font-mono tracking-widest text-mute mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-transparent border-0 border-b border-mute/25 pb-2 text-sm text-parchment placeholder:text-mute/40 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase font-mono tracking-widest text-mute mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-transparent border-0 border-b border-mute/25 pb-2 text-sm text-parchment placeholder:text-mute/40 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="organization" className="block text-[11px] uppercase font-mono tracking-widest text-mute mb-2">
                    Organization / Firm
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Optional"
                    className="w-full bg-transparent border-0 border-b border-mute/25 pb-2 text-sm text-parchment placeholder:text-mute/40 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Organization" field="organization" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-[11px] uppercase font-mono tracking-widest text-mute mb-2">
                    Inquiry Type
                  </label>
                  <input
                    id="inquiryType"
                    name="inquiryType"
                    type="text"
                    placeholder="e.g. Public Commission, Press"
                    className="w-full bg-transparent border-0 border-b border-mute/25 pb-2 text-sm text-parchment placeholder:text-mute/40 focus:border-bronze focus:outline-none transition-colors"
                  />
                  <ValidationError prefix="Inquiry Type" field="inquiryType" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] uppercase font-mono tracking-widest text-mute mb-2">
                  Project Brief &amp; Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Share details regarding site location, timeline, or sculpture scale..."
                  className="w-full bg-transparent border-0 border-b border-mute/25 pb-2 text-sm text-parchment placeholder:text-mute/40 focus:border-bronze focus:outline-none transition-colors resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-400 mt-1 block" />
              </div>

                <div className="pt-2 flex items-center justify-between">
                  <PrimaryButton type="submit" disabled={state.submitting} showIcon={!state.succeeded} className={state.submitting ? "opacity-70 cursor-not-allowed" : ""}>
                    {state.succeeded ? (
                      <span className="flex items-center gap-2 text-emerald-300">
                        <FontAwesomeIcon icon={faCheck} />
                        Transmitted Successfully
                      </span>
                    ) : state.submitting ? (
                      "Transmitting..."
                    ) : (
                      "Transmit Inquiry"
                    )}
                  </PrimaryButton>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-bronze-light text-[9px]">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <span>SSL Encrypted Dialogue</span>
                  </div>
                </div>
            </form>
          </div>

        </div>
      </section>

      {/* Sister Studio Banner */}
      <StudioBanner />
    </div>
  );
}
